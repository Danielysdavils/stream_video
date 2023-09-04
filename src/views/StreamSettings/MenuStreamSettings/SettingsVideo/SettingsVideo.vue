<template>
    <div class="cont-SliderMenu">
        <SliderMenu :toolToRender="videoData" :nameOfSection="this.nameOfSection" />
    </div>
</template>

<script>
    import VideoTools from '@/class/Video/VideoTools'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue';

    export default{
        data: () => {
            return{
                videoData: new VideoTools(),
                nameOfSection: 'video'
            }
        },
        components:{
            SliderMenu
        }
    }
</script>