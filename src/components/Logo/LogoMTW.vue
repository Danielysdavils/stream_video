<template>
    <div class="copy-right" :style="setStyleConteiner">
        <h5 class="copy-right-tittle" :style="setMargin">Develop by</h5>
        <h2 class="mtwLogo" >MTW</h2>
    </div> 
</template>

<script>
    export default{
        props: ['flexDirection', 'marginChildren'],

        computed: {
            setStyleConteiner(){
                return {"flex-direction" : this.flexDirection}
            },

            setMargin(){
                return {"margin-right": this.marginChildren}
            }
        }
    }

</script>

<style>

    .copy-right{
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4;
        width: 100%;

        margin-top: 40px;
    }

    .copy-right-tittle{
        font-size: 15px;
    }

</style>