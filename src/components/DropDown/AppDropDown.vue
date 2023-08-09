<template>
    <div @click="toggle" v-on-clickaway="away" class="relative">
        <slot name="toggler">
            <button>Toggle</button>
        </slot>
        <slot />
    </div>
</template>
  
<script>
    import { mixin as clickaway } from "vue-clickaway";
  
    export default {
        name: "AppDropdown",

        mixins: [clickaway],
        
        provide() {
            return {
                sharedState: this.sharedState
            };
        },
        data() {
            return {
                sharedState: {
                    active: false
                }
            };
        },
        methods: {
            toggle() {
                this.sharedState.active = !this.sharedState.active;
            },
            away() {
                this.sharedState.active = false;
            }
        }
    };
</script>

<style>
    .relative{
        display: flex;
        flex-direction: row-reverse; 
    }

    @media (min-width: 0px) and (max-width: 800px){
        .relative{
            flex-direction: column-reverse;
        }
    }

</style>
  