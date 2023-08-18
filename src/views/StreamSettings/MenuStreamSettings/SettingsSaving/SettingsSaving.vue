<template>
     <CarouselDisplay>
        <rl-carousel-slide class="itemToRender-carousel">
            <div class="graphics-section">
                <h1 class="name-tool">Option 1</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>

        <rl-carousel-slide class="itemToRender-carousel">
            <div class="graphics-section">
                <h1 class="name-tool">Option 2</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    import RangeInput from '@/components/Graphics/RangeInput.vue';
    import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'

    import {RlCarouselSlide} from 'vue-renderless-carousel' 

    export default{
        components : {
            RangeInput,
            SelectedButton,
            CarouselDisplay,
            RlCarouselSlide        
        }
    }

</script>