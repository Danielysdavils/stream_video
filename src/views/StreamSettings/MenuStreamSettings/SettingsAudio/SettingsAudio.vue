<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="audioTools" 
            :nameOfSection="nameOfSection"
            :SectionActive="getSectionActive"
            :SectionDefault="'codec'"/>
    </div>
</template>

<script>
    import AudioTools from '@/class/Audio/AudioTools.js'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue'
    import store from '@/store/store'

    export default{
        data: () => {
            return{
                audioTools: new AudioTools(),
                nameOfSection: 'audio'
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

<style>
    .cont-SliderMenu{
        width: 100%;
    }
</style>