<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="inputTools" :nameOfSection="this.nameOfSection"/>
    </div>
</template>

<script>
    import InputTools from '@/class/Input/InputTools.js'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue'

    export default{
        props:[],

        data: () => {
            return{
                inputTools: new InputTools(),
                nameOfSection: 'input'
            }
        },

        components:{
            SliderMenu
        }
    }

</script>