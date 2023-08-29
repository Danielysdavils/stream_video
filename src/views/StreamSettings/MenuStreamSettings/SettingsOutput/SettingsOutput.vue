<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="outputTools" :nameOfSection="this.nameOfSection"/>
    </div>
</template>

<script>
    import OutputTools from '@/class/Output/OutputTools.js'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue'

    export default{
        props:[],

        data: () => {
            return{
                outputTools: new OutputTools(),
                nameOfSection:'output'
            }
        },

        components:{
            SliderMenu
        }
    }

</script>