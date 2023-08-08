<template>
    <div class="copy-right" :style="setStyleConteiner">
        <h5 class="copy-right-tittle" :style="setMargin">Develop by</h5>
        <img src="../../assets/icones-logoType/bg3.png" class="logoType-img"/>
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

        margin-top: 25px;
    }

    .copy-right-tittle{
        font-size: 15px;
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: var(--FontOther);
    }

    .logoType-img{
        width: 70px;
        height: 70px;
    }

</style>