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
            </div>

            <div v-if="isLoanding" class="animation-cont">
                <div v-if="isLoanding"><LoaderCircles /></div>

                <div v-if="getIsSavingData">
                    <h1>Foi salvo!</h1>
                </div>

                <div v-if="!getIsSavingData">
                    <h1>Não foi salvo!</h1>
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

        //Antes da inicialização popula os array en data:() com as informações da api
        // Importante que já estejam disponíveis as propiedades do componente para conseguir utilizá-las.
        beforeMount(){
            this.sendRange();
            this.sendButton();
            this.sendText();
        },

        //ToolToRender --> Clase [video || audio || input || output] das ferramentas a renderizar 
        //NameOfSection --> Nome da clase [video, audio, input, output]

        props: ['toolToRender', 'nameOfSection'],
        
        data: () => {
            return{
                //Data com as info da api
                rangeData: [],
                buttonData: [],
                textData: [],

                //Guardo a informação do último botão clicado
                itemClicked: '',

                isLoanding: ''
            }
        },

        computed:{

            getIsSavingData(){
                return store.getters['connections/getStatusOfData']['save'].status;
            },

            //Retorna um inteiro que representa a seção do menuDisplay ativa no momento. 
            getSectionActive(){
                return store.getters['tool/getSlide'];
            },

            //ModelFuntions: 
            //Mostra nos graficos os valores da api
            modelDataRange(){
                console.log(this.setRangeDataValueInput());
                return this.setRangeDataValueInput();
            },
            
            modelDataButton(){
                return this.setButtonDataValueInput();
            },
            
            modelDataText(){
                return this.setTextDataValueInput();
            }
        },

        methods:{
            //SetFunctions
            //Percorro os array com as informações da api e retorno o valor correspondente a cada grafico. 
            setRangeDataValueInput(){
                let data = 0; 
                this.rangeData.forEach(item => {
                    if(item.name == this.getSectionActive) 
                        data = item.value;
                });
                console.log(data);
                return data;
            },

            setButtonDataValueInput(){
                let data = '';
                this.buttonData.forEach(item => {
                    if(item.name == this.getSectionActive) 
                        data = {name: item.value, status: true}
                });
                return data;
            },
            setTextDataValueInput(){
                let data = '';
                this.textData.forEach(item => {
                    if(item.name == this.getSectionActive) 
                        data = item.value; 
                })
                return data;
            },

            //Async SendFunctions
            //Popula os Arrays com os dados dos inputs atuais do store 
            async sendRange(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.range.status){
                        this.rangeData.push(store.getters[`${this.nameOfSection}/${tool.name}`]);
                    }
                });
                console.log(this.rangeData);
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

            //Async getFunctions 
            //Envia pra api as alterações do usuário e modifica o estado do store
            //this.sendRange() -> repopula os dados dos array com os dados atuais da api

            async getRange(data){
                //Mando info do user
                //Adicionar Animações para representar os estados da info

                this.isLoanding = true;

                const response = await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);

                if(response != 200){
                    this.isLoanding = false;
                    store.dispatch('connection/setStatusOfData', {
                        name: 'dontSave',
                        status: true
                    })
                    
                }else{
                    this.isLoanding = false;
                    store.dispatch('connection/setStatusOfData', {
                        name: 'save',
                        status: true
                    })
                }
            },

            async getText(data){
                await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                this.sendText();
            },

            async getButton(data){
                await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                this.sendButton();
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
        margin-top: 100px;
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
        height: 0.5px;
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
        height: 10%;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>