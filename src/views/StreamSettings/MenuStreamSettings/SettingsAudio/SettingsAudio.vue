<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="audioTools" :nameOfSection="nameOfSection"/>
    </div>
</template>

<script>
    import AudioTools from '@/class/Audio/AudioTools.js'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue'

    export default{
        data: () => {
            return{
                audioTools: new AudioTools(),
                nameOfSection: 'audio'
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