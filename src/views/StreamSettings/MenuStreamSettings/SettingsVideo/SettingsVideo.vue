<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="videoData" 
            :nameOfSection="this.nameOfSection"
            :SectionActive="getSectionActive"
            :SectionDefault="'resolution'" />
    </div>
</template>

<script>
    import VideoTools from '@/class/Video/VideoTools'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue';
    import store from '@/store/store'

    export default{
        data: () => {
            return{
                videoData: new VideoTools(),
                nameOfSection: 'video'
            }
        },

        computed: {
            getSectionActive(){
                return store.getters['tool/getSlide'];
            }
        },

        components:{
            SliderMenu
        }
    }
</script>