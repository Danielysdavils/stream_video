<template>
    <div>
        <CarouselDisplay>
            <CarouselItem></CarouselItem>        
        </CarouselDisplay>
    </div>
</template>

<script>
    //import RangeInput from '../../../../components/Graphics/RangeInput.vue'
    //import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import CarouselItem from '@/components/Carousel/CarouselItem.vue'

    export default{
        props: ['itemSelected'],

        data(){
            return{
                

            }
        },

        components: {
            //RangeInput,
            //SelectedButton,
            CarouselDisplay,
            CarouselItem
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