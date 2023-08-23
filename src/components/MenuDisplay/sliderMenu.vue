<template>
    <CarouselDisplay >
        <rl-carousel-slide v-for="tool in toolToRender.tools" :key="tool.id" class="itemToRender-carousel">
            <div class="graphics-section" >

                <h1 class="name-tool">{{ $t(tool.name) }}</h1>
                <div class="row-separator"></div>
                    
                <div class="graphic-button" v-if="tool.options.button.status" >
                    <div class="graphic-button" v-for="item in tool.options.button.sections" :key="item.id"> 
                        <SelectedButton 
                            v-on:click="setButtonClicked(item.name)"
                            :inputs="item.name"
                            :value="buttonData"
                            @buttonSelected="getButton"/>    
                    </div>
                </div>

                <div class="graphic-range" v-if="tool.options.range.status" > 
                    <div class="graphic-range" v-for="item in tool.options.range.sections" :key="item.id">
                        <RangeInput
                        :value="setRangeDataValueInput(item.id, tool.name)"
                        @dataGraphic="getRange"/>
                    </div>                
                </div>

                <div class="graphic-text" v-if="tool.options.text.status" >
                    <div class="graphic-text" v-for="item in tool.options.text.sections" :key="item.id">
                        <TextInput 
                        :value="setRangeDataValueInput(item.id, tool.name)"
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
        props: ['toolToRender'],
    
        data:() => {
            return{
                rangeData: [],
                buttonData: [],
                textData: []
            }
        },

        /*
            //Resolution
            input1 --> range: 0, 
            input2 --> framRate: 0

            item.forEach(section => {
                        if(section.id == idInput) 
                            data = section.value
                    })

            //[Segregado] --> videoTools
            pegar infos de rangeData --> mandar para cada input
        */

        methods:{
            setRangeDataValueInput(idInput, nameOfSection){
                let data = 0;
               
                console.log(idInput);
                console.log(nameOfSection);

                this.rangeData.forEach((item) => {
                    console.log(item);    
                });
                return data;
            },

            async sendRange(){
                await this.toolToRender.tools.forEach(tool => {
                    this.rangeData.push({[tool.name] : store.getters[tool.name]});
                });
            },

            async sendButton(){
                this.buttonData = await this.toolToRender.tools.forEach(tool => {
                    tool.name == store.getters[tool.name] ? store.getters[tool.name] : ''
                })

                console.log(this.buttonData);
            },

            async sendText(){
                this.textData = await this.toolToRender.tools.forEach(tool => {
                    tool.name == store.getters[tool.name] ? store.getters[tool.name] : ''
                })

                console.log(this.textData);
            },

            setButtonClicked(buttonClicked){
                console.log(buttonClicked);
            }, 
            
            async getRange(){

            },

            async getButton(){

            },

            async getText(){

            }   
        },

        async mounted(){
            //Popula as info em graphics range
            await this.sendRange()

            //Popula as info em graphis button
            await this.sendButton();            

            //Popula as info em graphics text
            await this.sendText();
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
        width: 100%;
        display: flex;
        align-items: center;
    }

    .graphic-text{
        width: 100%;
    }

</style>