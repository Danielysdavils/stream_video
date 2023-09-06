<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="inputTools" 
            :nameOfSection="this.nameOfSection"
            :SectionActive="getSectionActive"
            :SectionDefault="'audio-source'"/>
    </div>
</template>

<script>
    import InputTools from '@/class/Input/InputTools.js'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue'
    import store from '@/store/store'

    export default{
        props:[],

        data: () => {
            return{
                inputTools: new InputTools(),
                nameOfSection: 'input'
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