<template>
    <CarouselDisplay >
        <rl-carousel-slide v-for="tool in toolToRender.tools" :key="tool.id" class="itemToRender-carousel">
            <div class="graphics-section" >
                <h1 class="name-tool">{{ $t(tool.name) }}</h1>
                <div class="row-separator"></div>
                    
                <div class="section-graphic" v-if="tool.options.button.status" >
                    <div v-for="item in tool.options.button.sections" :key="item.id"> 
                        
                        <SelectedButton 
                            :inputs="item.name"
                            :value="sendData(tool.name)"
                            @buttonSelected="getButton"/>    
                    </div>
                </div>

                <div class="section-graphic" v-if="tool.options.range.status" >
                 
                    <RangeInput
                        v-for="item in tool.options.range.sections" :key="item.id"
                        :value="sendData(tool.name)"
                        @dataGraphic="getRange"/>
                </div>

                <div class="section-graphic" v-if="tool.options.text.status" >
                    
                    <TextInput 
                        v-for="item in tool.options.text.sections" :key="item.id"
                        :value="sendData(tool.name)"
                        @dataInput="getInput" />
                </div>
            </div>
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    //Graphics inputs
    import RangeInput from '../../../../components/Graphics/RangeInput.vue';
    import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import TextInput from '@/components/shared/Input/TextInput.vue';

    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'

    import store from '@/store/store'

    import {RlCarouselSlide} from 'vue-renderless-carousel' 

    export default{
    
        props: ['toolToRender'],
    
        methods:{
            sendData(data){
                let info = ''
                switch(data){

                    case 'codec':
                        info = store.getters.getCodec
                        break;
                    case 'resolution':
                        info = store.getters.resolution
                        break;

                    case 'framRate':
                        info = store.getters.framRate
                        break;

                    case 'bitRate':
                        info = store.getters.BitRate
                        break;

                    case 'quantizer':
                        info = store.getters.quantizer
                        break;
                }

                return info;
            },

            getRange(data){  
                switch (data.name) {
                    case 'codec':
                        store.dispatch('putCodec', data.data)
                        break;
                    case 'resolution':
                        store.dispatch('putResolution', data.data)
                        break;
                    case 'framRate':
                        store.dispatch('putframRate', data.data)
                        break;
                    case 'BitRate':
                        store.dispatch('putBitRate', data.data)
                        break;
                    case 'quantizer':
                        store.dispatch('putQuantizer', data.data)
                        break;
                }    
            },

            getButton(data){
                switch (data.name) {
                    case 'codec':

                        store.dispatch('putCodec', data.data)
                        break;
                    case 'resolution':
                        break;
                    case 'framRate':
                        break;
                    case 'BitRate':
                        break;
                    case 'quantizer':
                        break;
                }
            },

            getInput(data){
                switch (data.name) {
                    case 'codec':
                       
                        break;
                    case 'resolution':

                        break;
                    case 'framRate':
                        
                        break;
                    case 'BitRate':
                        
                        break;
                    case 'quantizer':
                        
                        break;
                }
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

    .section-graphic{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>