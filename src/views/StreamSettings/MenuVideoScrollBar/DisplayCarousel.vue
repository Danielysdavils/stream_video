<template>
    <div class="conteiner-displayCarousel">
        <CarouselDisplay>
            <rl-carousel-slide class="itemToRender-carousel">
                <div class="graphics-section">
                    <h1 class="name-tool">Slide1</h1>
                    <RangeInput />
                    <SelectedButton />
                </div>
            </rl-carousel-slide>
        </CarouselDisplay>
    </div>
</template>

<script>
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import {RlCarouselSlide} from 'vue-renderless-carousel' 
    
    export default{
        components:{
            CarouselDisplay,
            RlCarouselSlide
        }
    }

</script>

<style>
    .conteiner-displayCarousel{
        width:100%;
        height: 100%;
        background-color: var(--color1);
    }
</style>