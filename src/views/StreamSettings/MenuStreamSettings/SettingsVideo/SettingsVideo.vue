<template>
    <CarouselDisplay>
        <rl-carousel-slide>
            <div class="graphics-section">
                <h1 class="name-tool">Resolution</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>
            
        <rl-carousel-slide>
            <div class="graphics-section">
                <h1 class="name-tool">Codec</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>

        <rl-carousel-slide>
            <div class="graphics-section">
                <h1 class="name-tool">FramRate</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>

        <rl-carousel-slide>
            <div class="graphics-section">
                <h1 class="name-tool">BitRate</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>

        <rl-carousel-slide>
            <div class="graphics-section">
                <h1 class="name-tool">Quantizer</h1>
                <RangeInput />
                <SelectedButton />
            </div>
        </rl-carousel-slide>
    </CarouselDisplay>
</template>

<script>
    import RangeInput from '../../../../components/Graphics/RangeInput.vue'
    import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import CarouselDisplay from '@/components/Carousel/CarouselDisplay.vue'

    import {RlCarouselSlide} from 'vue-renderless-carousel' 

    export default{
        components: {
            RangeInput,
            SelectedButton,
            CarouselDisplay,
            RlCarouselSlide
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

        margin-bottom: 280px;
    }
</style>