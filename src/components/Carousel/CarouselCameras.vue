<template>
    <CarouselDisplay>
        <rl-carousel-slide>
            <div class="displayVideo-carousel">
                <StreamSectionVue />
            </div>
        </rl-carousel-slide> 
    </CarouselDisplay>
</template>

<script>

    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'
    import {RlCarouselSlide} from 'vue-renderless-carousel'
    import StreamSectionVue from '@/views/StreamSettings/StreamSection/StreamSection.vue'; 

    export default{
        components: {
            CarouselDisplay,
            RlCarouselSlide,
            StreamSectionVue
        }
    }
</script>