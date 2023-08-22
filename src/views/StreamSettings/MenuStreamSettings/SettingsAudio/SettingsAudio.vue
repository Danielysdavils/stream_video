<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="audioTools"/>
    </div>
</template>

<script>

    import AudioTools from '@/class/Audio/AudioTools.js'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue'

    export default{
        props:[],

        data: () => {
            return{
                audioTools: new AudioTools()
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