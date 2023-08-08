<template>
    <div class="displayContainer">
        <div class="conteiner-border" :style="setBorderColor">
            <div class="video-rep"></div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['BorderColor', 'BoxShadow'],

        computed:{
            setBorderColor(){
                return {
                        "background-color": this.BorderColor,
                        "box-shadow": this.BoxShadow
                        }
            },

            
        }
    }

</script>

<style>
    .displayContainer{
        width: 100%;
        height: 60%;

        display: flex;
        justify-content: center;
        border-radius: 20px;

        padding: 30px;

        position: relative;
        z-index: 10;
    }

    .conteiner-border{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 100%;
        border-radius: 5px;
    }

    .video-rep{
        width: 100%;
        height: 90%;
        background-color: black;
    }   
</style>