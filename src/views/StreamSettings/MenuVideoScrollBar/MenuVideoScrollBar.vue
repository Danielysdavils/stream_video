<template>
    <div class="displayCont" :style="setHeight">
        <section class="navigation-options-section">
            <div 
                v-if="isOpenDeviceStream" 
                class="cont-options" :style="setStyle">
                <img
                    v-on:click="setDeviceStream" 
                    src="@/assets/seta.png" 
                    alt="" 
                    class="icone-close">
            </div>

            <div 
                v-else
                class="cont-options" :style="setStyle">
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
                isOpenDeviceStream : false
            }
        },

        props: ['colorBackground'],

        methods:{
            setDeviceStream(){
                this.isOpenDeviceStream =  !this.isOpenDeviceStream; 
                this.$emit('activeDisplay', this.isOpenDeviceStream);              
            }
        },

        computed:{
            setHeight(){
                return this.isOpenDeviceStream ? 
                { 
                    "height" : "30%"
                } : 
                {
                    "height" : "10%",
                    "transition" : "height 1s ease" 
                }
            },

            setStyle(){
                return {"background-color": this.colorBackground}
            }
        },

        components:{
            DisplayCarouselVue
        }
    }

</script>

<style>
    .displayCont{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        z-index: 15;
    }

    .icone-close{
        width: 25px;
        height: 25px;
        background-color: var(--color1Gradiente);
        border-radius: 50%;
        padding: 5px;
        margin-left: 5px;
        cursor: pointer;
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
        height: 100%;
    }

    .cont-options{
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 15px 15px 0px 0px;
    }

    .contDropDawn{
        height: 100%;
        display: flex;
        background-color: var(--color1);
    }

</style>