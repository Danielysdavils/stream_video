<template>
    <div>
        <Carousel :v-for="tool in tools" :key="tool.id">
            <CarouselItem>{{ tool }}</CarouselItem>        
        </Carousel>
    </div>
</template>

<script>
    import RangeInput from '../../../../components/Graphics/RangeInput.vue'
    import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import Carousel from '@/components/Carousel/Carousel.vue'
    import CarouselItem from '@/components/Carousel/CarouselItem.vue'

    export default{
        props: ['itemSelected'],

        data(){
            return{
                tools : [ 
                    {id: 1, tool: resolition},
                    {id: 2, tool: codec},
                    {id: 3, tool: framRate},
                    {id: 4, tool: bitRate},
                    {id: 5, tool: quantizer}
                ]

            }
        },

        components: {
            RangeInput,
            SelectedButton,
            Carousel
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

</style>