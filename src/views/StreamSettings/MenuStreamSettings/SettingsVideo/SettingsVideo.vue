<template>
    <div class="cont-SliderMenu">
        <SliderMenu :toolToRender="videoData" />
    </div>
</template>

<script>
    import VideoTools from '@/class/Video/VideoTools'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue';
    import store from '@/store/store'

    export default{
        data: () => {
            return{
                videoData: new VideoTools()
            }
        },

        async mounted(){
            await store.dispatch('getVideoData');
            console.log(store.getters.dataVideo);
        },

        components:{
            SliderMenu
        }
    }
</script>