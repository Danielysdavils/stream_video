<template>
    <CarouselDisplay >
        <rl-carousel-slide v-for="tool in toolToRender.tools" :key="tool.id" class="itemToRender-carousel">
            <div class="graphics-section" >
                <h1 class="name-tool">{{ $t(tool.name) }}</h1>
                <div class="row-separator"></div>
                
                <div class="graphic-button" v-if="tool.options.button.status" >
                    <div class="graphic-button" v-for="item in tool.options.button.sections" :key="item.id"> 
                        <div class="graphic-button" v-on:click="setItemClicked(item.name)">
                        <selected-button 
                            :inputs="item.name"
                            :isActive="modelDataButton == item.name && buttonClicked == '' ? true : false"
                            :setIsActive="setIsActive" 
                                                 
                            @buttonSelected="getButton"/>
                        </div>
                    </div>
                </div>

                <div class="graphic-range" v-if="tool.options.range.status" > 
                    <div class="graphic-range" v-for="item in tool.options.range.sections" :key="item.id">
                        <RangeInput
                        :value="modelDataRange"
                        @dataGraphic="getRange"/>
                    </div>                
                </div>

                <div class="graphic-text" v-if="tool.options.text.status" >
                    <div class="graphic-text" v-for="item in tool.options.text.sections" :key="item.id">
                        <TextInput 
                        :value="modelDataText"
                        @dataInput="getText" />
                    </div>
                </div>
            </div>
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    //Graphics inputs
    import RangeInput from '@/components/Graphics/RangeInput.vue';
    import SelectedButton from '@/components/Graphics/SelectedButton.vue';
    import TextInput from '@/components/Graphics/TextInput.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import store from '@/store/store'
    import {RlCarouselSlide} from 'vue-renderless-carousel' 

    export default{
        beforeMount(){
            this.sendRange();
            this.sendButton();
            this.sendText();
        },

        props: ['toolToRender'],
        
        data: () => {
            return{
                rangeData: [],
                buttonData: [],
                textData: [],

                buttonClicked : '',
                setIsActive: false
            }
        },

        computed:{
            getSectionActive(){
                return store.getters.getSlide;
            },

            modelDataRange(){
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
            //Trata e distribui a informação dos array para cada graphic input
            setRangeDataValueInput(){
                let data = 0; 
                this.rangeData.forEach(item => {
                    if(item.name == this.getSectionActive)
                        data = Number(item.value.replace(/[^0-9]/g,''));
                });
                return data;
            },

            setButtonDataValueInput(){
                let data = '';
              
                console.log(this.buttonData);
                this.buttonData.forEach(item => {
                    if(item.name == this.getSectionActive)
                        data = item.value
                })
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
                        this.rangeData.push(store.getters[tool.name]);
                    }
                });
            },

            async sendButton(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.button.status)
                        this.buttonData.push(store.getters[tool.name]);
                })
                
            },

            async sendText(){
                await this.toolToRender.tools.forEach(tool => {
                    if(tool.options.text.status)
                        this.textData.push(store.getters[tool.name])
                })
            },

            //Envia pra api as alterações do usuário
            async getRange(){

            },

            async getText(){

            },

            //Manda o nome do bottão clicado
            async getButton(data){
                console.log(data);
            },

            //Seta as configurações do button.
            setItemClicked(data){
                this.buttonClicked = data;
            }
        },

        watch:{
            buttonClicked(newValue, oldValue){
                console.log(newValue);
                console.log(oldValue);

                this.setIsActive = newValue != oldValue ? true : false                
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