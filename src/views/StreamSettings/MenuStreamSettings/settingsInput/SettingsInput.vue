<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="inputTools"/>
    </div>
</template>

<script>
    import InputTools from '@/class/Input/InputTools.js'
    import SliderMenu from '@/components/MenuDisplay/SliderMenu.vue'

    export default{
        props:[],

        data: () => {
            return{
                inputTools: new InputTools()
            }
        },

        components:{
            SliderMenu
        }
    }

</script>