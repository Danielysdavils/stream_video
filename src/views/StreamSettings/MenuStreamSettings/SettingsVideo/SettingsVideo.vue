<template>
    <div class="cont-SliderMenu">
        <SliderMenu :toolToRender="videoData" />
    </div>
</template>

<script>
    import VideoTools from '@/class/Video/VideoTools'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue';

    export default{
        data: () => {
            return{
                videoData: new VideoTools()
            }
        },
        components:{
            SliderMenu
        }
    }
</script>