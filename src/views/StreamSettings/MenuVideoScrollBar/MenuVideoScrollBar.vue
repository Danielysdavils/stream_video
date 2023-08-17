<template>
    <div class="displayCont">
        <section class="navigation-options-section">
            <div 
                v-if="isOpenDeviceStream" 
                class="cont-options">
                <img
                    v-on:click="setDeviceStream" 
                    src="@/assets/seta.png" 
                    alt="" 
                    class="icone-close">
            </div>

            <div 
                v-else
                class="cont-options">
                <img 
                    v-on:click="setDeviceStream"
                    src="@/assets/icones-tool/arrowhead-up.png" 
                    alt="" 
                    class="icone-close">
            </div>
        </section>
       
        <div class="contDropDawn" v-if="isOpenDeviceStream">
            <DisplayCarouselVue />
        </div>
    </div>
</template>

<script>
    import DisplayCarouselVue from './DisplayCarousel.vue';

    export default{
        data: ()=> {
            return{
                isOpenDeviceStream : true
            }
        },

        methods:{
            setDeviceStream(){
                this.isOpenDeviceStream =  !this.isOpenDeviceStream; 
                this.$emit('activeDisplay', this.isOpenDeviceStream);              
            }
        },

        components:{
            DisplayCarouselVue
        }
    }
</script>

<style>
    .displayCont{
        display: flexbox;
        flex-direction: row;
        width: 100%;
    }

    .icone-close{
        width: 25px;
        height: 25px;
        background-color: var(--color1Gradiente);
        border-radius: 50%;
        padding: 5px;
        margin-left: 5px;
    }

    .icone-close:hover{
        transition: background-color 0.5s ease-in;
        background-color: var(--color2Gradiente); 
        width: 27px;
        height: 27px;
    }

    /* tamanho do componente carousel */
    .navigation-options-section{
        width: 100%;
    }

    .cont-options{
        width: 100%;
        height: auto;
        background-color: var(--color1);
        padding: 6px;
    }

    .contDropDawn{
        height: 100%;
        display: flex;
        background-color: var(--color1);
    }

</style>