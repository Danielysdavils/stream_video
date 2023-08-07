<template>
    <div class="copy-right" :style="setStyleConteiner">
        <h5 class="copy-right-tittle">Develop by</h5>
        <h2 class="mtwLogo" >MTW</h2>
    </div> 
</template>

<script>
    // styleConfig : { conteiner: {}, elementChildren: {} }
    export default{
        props: ['flexDirection'],

        computed: {
            setStyleConteiner(){
                return {"flex-direction" : this.flexDirection}
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
        margin-right: 10px;
    }

</style>