<template>
    <CarouselDisplay >
        <rl-carousel-slide v-for="tool in toolToRender.tools" :key="tool.id" class="itemToRender-carousel">
            <div class="graphics-section" >
                <h1 class="name-tool">{{ $t(tool.name) }}</h1>
                <div class="row-separator"></div>
                
                <div class="graphic-button" v-if="tool.options.button.status" >
                    <div class="graphic-button" v-for="item in tool.options.button.sections" :key="item.id"> 
                        <div class="graphic-button" v-on:click="setItem(item)">
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
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    import RangeInput from '@/components/Graphics/RangeInput.vue';
    import SelectedButton from '@/components/Graphics/SelectedButton.vue';
    import TextInput from '@/components/Graphics/TextInput.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import store from '@/store/store'
    import {RlCarouselSlide} from 'vue-renderless-carousel' 

    export default{
        //Antes da inicialização popula os array en data com as informações da api
        beforeMount(){
            this.sendRange();
            this.sendButton();
            this.sendText();
        },
        //ToolToRender 
        //NameOfSection
        props: ['toolToRender', 'nameOfSection'],
        
        data: () => {
            return{
                //Data com as info da api
                rangeData: [],
                buttonData: [],
                textData: [],

                itemClicked: ''
            }
        },

        computed:{
            getSectionActive(){
                return store.getters['tool/getSlide'];
            },

            modelDataRange(){
                return this.setRangeDataValueInput();
            },

            modelDataButton(){
                console.log(this.setButtonDataValueInput());
                return this.setButtonDataValueInput();
            },

            modelDataText(){
                return this.setTextDataValueInput();
            }
        },

        methods:{
            setRangeDataValueInput(){
                let data = 0; 
                this.rangeData.forEach(item => {
                    if(item.name == this.getSectionActive) 
                        data = item.value;
                });
                return data;
            },
            
            setButtonDataValueInput(){
                let data = '';
                this.buttonData.forEach(item => {
                    if(item.name == this.getSectionActive) 
                        data = {name: item.value, status: true}
                });
                console.log(data);
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

            //Popula os Arrays com os dados dos inputs atuais do store 
            async sendRange(){
                this.toolToRender.tools.forEach(tool => {
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
                console.log(store.getters);
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.text.status)
                        this.textData.push(store.getters[`${this.nameOfSection}/${tool.name}`])
                })
            },

            //Envia pra api as alterações do usuário
            //{name: range, value: 30}
            async getRange(data){
                console.log(data);
                await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);        
            },

            async getText(data){
                await store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
            },

            async getButton(data){
                setTimeout(() => {
                    store.dispatch(`${this.nameOfSection}/sendDataUser`, data);
                }, 1000)
            },

            setItem(item){
                this.itemClicked = item;

                setTimeout(() => {
                    this.getButton(item);    
                }, 1000);
            }
        },

        components: {
            RangeInput,
            SelectedButton,
            CarouselDisplay,
            RlCarouselSlide,
            TextInput
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        padding: 20px;
        margin-top: 30px;
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

</style>