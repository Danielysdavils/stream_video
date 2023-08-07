<template>
    <rl-carousel v-model="slide" vertical>
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
        computed:{
            slide(){
                return store.getters.getId
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
</style>
