<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="streamingTools"/>
    </div>
</template>

<script>
    import StreamingTools from '@/class/Streaming/StreamingTools.js'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue'

    export default{
        props:[],

        data: () => {
            return{
                streamingTools: new StreamingTools()
            }
        },

        components:{
            SliderMenu
        }
    }

</script>