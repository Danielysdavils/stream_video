<template>
    <rl-carousel v-model="slide" 
        :vertical="setCarousel">

        <div slot-scope="{wrapperStyles}" class="w-full overflow-hidden">
            <div v-bind="wrapperStyles" class="flex flex-col w-full">
                <slot></slot>
            </div>
        </div>
  </rl-carousel>
    
</template>

<script>
    import {RlCarousel} from 'vue-renderless-carousel'
    import store from '@/store/store'

    export default{

        data: () => {
            return{
                windowWidth: window.innerWidth
            }
        },

        mounted(){
            this.$nextTick(() => {window.addEventListener('resize', this.onResize)})
        },

        beforeDestroy(){
            window.removeEventListener('resize', this.onResize); 
        },

        methods: {
            onResize() {
                this.windowWidth = window.innerWidth
            }
        },

        computed:{
            slide(){
                return store.getters.getId
            },

            setCarousel(){
                if(this.windowWidth <= 800) return false;
                else return true;
            }
        },

        components:{
            RlCarousel
        }
    }
</script>

<style>
    .flex, .flex-col, .w-full{
        width: 100%;
        display: flex;
        flex-direction: column; 
        flex-wrap: nowrap;
    }

    @media(min-width: 0px) and (max-width: 800px){
        .flex, .flex-col, .w-full{
            flex-direction: row;
        }
    }
</style>
