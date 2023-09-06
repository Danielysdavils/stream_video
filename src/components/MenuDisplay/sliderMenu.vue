<template>
    <CarouselDisplay >
        <rl-carousel-slide v-for="tool in toolToRender.tools" :key="tool.id" class="itemToRender-carousel">
            <div class="graphics-section" >
                <h1 class="name-tool">{{ $t(tool.name) }}</h1>
                <div class="row-separator"></div>
                
                <div class="graphic-button" v-if="tool.options.button.status" >
                    <div class="graphic-button" v-for="item in tool.options.button.sections" :key="item.id"> 
                        <div class="graphic-button" v-on:click="setItem(item, tool.name)">
                        <selected-button
                            :inputs="item"
                            :nameOfSection="tool.name"
                            :valueOfItem="modelDataButton"
                            :itemClicked="itemClicked"
                        />
                        </div>
                    </div>
                </div>

                <div class="graphic-range" v-if="tool.options.range.status" > 
                    <div class="graphic-range" v-for="item in tool.options.range.sections" :key="item.id">
                        <RangeInput
                        :nameOfSection="tool.name"
                        :value="modelDataRange"
                        @dataGraphic="getRange"/>
                    </div>                
                </div>

                <div class="graphic-text" v-if="tool.options.text.status" >
                    <div class="graphic-text" v-for="item in tool.options.text.sections" :key="item.id">
                        <TextInput 
                        :value="modelDataText"
                        />
                    </div>
                </div>

                <div class="animation-cont">
                    <div v-if="setIsLoanding" class="cont-text">
                        <LoaderCircles />
                        <h1 class="txt-loanding">Salvando alterações...</h1>
                    </div>

                    <div v-if="!setIsLoanding && setSaved" class="cont-text">
                        <div class="cont-text-animation">
                            <h1 class="txt-loanding">Alterações Salvas!</h1>
                            <img class="img-loading" src="../../assets/icones-tool/verifica.png" alt="">
                        </div>
                    </div>

                    <div v-if="!setSaved && !setIsLoanding" class="cont-text">
                        <div class="cont-text-loanding-err">
                            <h1 class="txt-loanding">As alterações não foram salvas!</h1>
                            <img class="img-loading" src="../../assets/icones-tool/error.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    //Valores segregados por tipo de dados
    //1. Buttons -> string
    //2. Ranges -> int
    //3. Text -> string

    import RangeInput from '@/components/Graphics/RangeInput.vue';
    import SelectedButton from '@/components/Graphics/SelectedButton.vue';
    import TextInput from '@/components/Graphics/TextInput.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import store from '@/store/store'
    import {RlCarouselSlide} from 'vue-renderless-carousel' 
    import LoaderCircles from '@/components/Animations/Loader/LoaderCircles.vue'

    export default{

        //Antes da inicialização, popula os array en data:() com as informações da api.
        beforeMount(){
            this.sendRange();
            this.sendButton();
            this.sendText();
        },

        //ToolToRender --> Clase [video || audio || input || output] das ferramentas a renderizar 
        //NameOfSection --> Nome da clase [video, audio, input, output]
        //SectionActive --> Seção ativa do menuSlide selecionada pelo usuário
        //SectionDefault --> Seção default a mostrar quando nenhuma opção seja clicada

        props: ['toolToRender', 'nameOfSection', 'SectionActive', 'SectionDefault'],
        
        data: () => {
            return{
                //Data com as info da api
                    //RangeData :Array de string de inteiros [1,3,5]
                    //ButtonData :Array de string ['1080', '' ...]
                    //textData : Array de string ['', '' ...]
                rangeData: [],
                buttonData: [],
                textData: [],

                //Guardo a informação do último botão clicado :String
                itemClicked: '',

                //Informação do status da quary enviada pra api [200 ou 400 etc..]
                    //dataSave :int
                dataSave : '',
                //Configuração da animação de loanding
                    //isLoanding :bool [estado da animação]
                    //isSave: :bool [informação foi salva]
                isLoanding: false,
                isSave: false,

                //Seção ativa no momento
                sectionActive : ''
            }
        },

        watch:{
            //Muda reactivamente a seção ativa no momento
            SectionActive(newV, oldV){
                this.sectionActive = oldV == '' ? this.SectionDefault : newV
            }
        },

        computed:{        
            //ModelFuntions [modelDataRange(),  modelDataButton(), modelDataText()] 
            //Mostra nos compoentes de graficos os valores da api
            modelDataRange(){
                //Atualiza o valor do vetor com os valores atualizados da store.
                this.sendRange();

                //Chama a função que seleciona o valor a mostrar dependendo da seção selecionada
                return this.setRangeDataValueInput();
            },
            
            modelDataButton(){
                return this.setButtonDataValueInput();
            },
            
            modelDataText(){
                return this.setTextDataValueInput();
            },

            //SetFunctions [setIsLoanding(), setSaved()]
            // Retorno o valor reactivo do status das variáveis (true/false) para mostrar as animações
            setIsLoanding(){
                return this.isLoanding
            },

            setSaved(){
                return this.isSave;
            }
        },
       
        methods:{
            //SetFunctions [ setRangeDataValueInput(),  setButtonDataValueInput(), setTextDataValueInput()]
            //Percorro os array com as informações da api e retorno o valor correspondente a cada grafico dependendo da seção selecionada pelo usuário. 
            setRangeDataValueInput(){
                let data = 0; 
                this.rangeData.forEach(item => {
                    if(item.name == this.SectionActive) 
                        data = item.value;
                });
                return data;
            },
            setButtonDataValueInput(){
                let data = '';
                this.buttonData.forEach(item => {
                    if(item.name == this.SectionActive) 
                        data = {name: item.value, status: true}
                });
                return data;
            },
            setTextDataValueInput(){
                let data = '';
                this.textData.forEach(item => {
                    if(item.name == this.SectionActive) 
                        data = item.value; 
                })
                return data;
            },

            //Async SendFunctions [sendRange(), sendButton(), sendText()]
            //Popula os Arrays [rangeData, buttonData, textData] com os dados atuais da store 
            async sendRange(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.range.status){
                        this.rangeData.push(store.getters[`${this.nameOfSection}/${tool.name}`]);
                    }
                });
            },
            async sendButton(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.button.status)
                        this.buttonData.push(store.getters[`${this.nameOfSection}/${tool.name}`]);
                })
            },
            async sendText(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.text.status)
                        this.textData.push(store.getters[`${this.nameOfSection}/${tool.name}`])
                })
            },

            //Async getFunctions [getRange(), getButton(), getText()]
            //Envia pra api as alterações do usuário e altera o estatus da animação de loanding conforme o resultado da query

            async getRange(data){
                if(this.SectionActive == data.name){
                    this.isLoanding = true;
                    this.dataSave =  await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                    if(this.dataSave != 200){
                        store.dispatch('connection/setStatusOfData', {
                            name: 'dontSave',
                            status: true
                        })
                        this.isSave = store.getters['connection/getStatusOfData']['save'].status  
                    }else{
                        store.dispatch('connection/setStatusOfData', {
                        name: 'save',
                        status: true})

                        this.isSave = store.getters['connection/getStatusOfData']['save'].status
                    }
                    setTimeout(() => {
                        this.isLoanding = false;    
                    }, 1000)                    
                }  
            },

            async getText(data){
                this.isLoanding = true;
                this.dataSave = await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                this.sendText();
                if(this.dataSave != 200){
                    store.dispatch('connection/setStatusOfData', {
                        name: 'dontSave',
                        status: true
                    })
                    this.isSave = store.getters['connection/getStatusOfData']['save'].status
                }else{
                    store.dispatch('connection/setStatusOfData', {
                        name: 'save',
                        status: true
                    })
                    this.isSave = store.getters['connection/getStatusOfData']['save'].status
                }
                setTimeout(() => {
                    this.isLoanding = false;        
                }, 1000) 
            },

            async getButton(data){
                this.isLoanding = true;
                this.dataSave = await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                this.sendButton();
                if(this.dataSave != 200){
                    store.dispatch('connection/setStatusOfData', {
                        name: 'dontSave',
                        status: true
                    })
                    this.isSave = store.getters['connection/getStatusOfData']['save'].status
                }else{
                    store.dispatch('connection/setStatusOfData', {
                        name: 'save',
                        status: true
                    })
                    this.isSave = store.getters['connection/getStatusOfData']['save'].status
                }
                setTimeout(() => {
                    this.isLoanding = false;    
                }, 1000) 
            },

            //Configuração do button clicado. 
            setItem(item, nameOfSection){
                this.itemClicked = item;
                setTimeout(() => {
                    let info = nameOfSection == 'resolution' ? `-2:${item.name}` : item.name;
                    this.getButton({name: nameOfSection, value: info});    
                }, 1000);
            }     
        },

        components: {
            RangeInput,
            SelectedButton,
            CarouselDisplay,
            RlCarouselSlide,
            TextInput,
            LoaderCircles
        }
    }
</script>

<style>
    .conteiner-Settings-video{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tittle-section{
        width: 100%;
        height: 20%;
        color: var(--color4);
        font-size: 20px;
        margin-top: 20px;
        margin-left: 20px;
    }

    .graphics-section{
        height: 90%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        padding: 20px;
        margin-top: 70px;
        margin-bottom: 280px;
    }

    .name-tool{
        font-family: var(--fontOther);
    }

    .itemToRender-carousel{
        width: 100%;
    }

    .row-separator{
        width: 15%;
        height: 2px;
        background-color: var( --color3);
        border-radius: 30px;
        margin-bottom: 50px;
    }

    .graphic-range{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .graphic-button{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .graphic-text{
        width: 100%;
    }

    .animation-cont{
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .txt-loanding{
        font-size: 12px;
        margin-bottom: 0px;
        margin-top: 0px;
    }

    .cont-text{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    /* box-shadow: 1px 1px 5px rgb(186, 244, 186); border: solid 1px rgb(186, 244, 186); */
    .cont-text-animation, .cont-text-loanding-err{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: rgba(138, 255, 138, 0.275);
        border-radius: 10px;
        font-family: var(--FontLabel);
    }

    .cont-text-loanding-err{
        background-color: rgba(255, 140, 140, 0.275);
    }

    .img-loading{
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
</style>