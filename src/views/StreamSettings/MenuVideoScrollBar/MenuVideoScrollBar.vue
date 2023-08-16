<template>
    <div class="displayCont" v-if="isOpenDeviceStream">
        <div class="cont-options">
            <img 
                v-on:click="closeDeviceStream()" 
                src="@/assets/icones-tool/logout.png"
                class="icone-close">
        </div>
       
        <div class="contDropDawn"></div>
    </div>
</template>

<script>
    export default{
        data: ()=> {
            return{
                isOpenDeviceStream : true
            }
        },

        methods:{
            closeDeviceStream(){
                this.isOpenDeviceStream =  !this.isOpenDeviceStream               
            }
        }
    }
</script>

<style>
    .displayCont{
        display: flexbox;
        flex-direction: row;
        width: 100%;
        height: 30%;
        background-color: var(--color1);
    }

    .icone-close{
        width: 25px;
        height: 25px;
    }
</style>