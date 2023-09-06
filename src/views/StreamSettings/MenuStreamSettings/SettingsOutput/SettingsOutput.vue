<template>
    <div class="cont-SliderMenu">
        <SliderMenu 
            :toolToRender="outputTools" :nameOfSection="this.nameOfSection"
            :SectionActive="getSectionActive"
            :SectionDefault="'protocol'"/>
    </div>
</template>

<script>
    import OutputTools from '@/class/Output/OutputTools.js'
    import SliderMenu from '@/components/MenuDisplay/sliderMenu.vue'
    import store from '@/store/store'

    export default{
        props:[],

        data: () => {
            return{
                outputTools: new OutputTools(),
                nameOfSection:'output'
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