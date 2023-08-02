<template>
    <div class="component-conteiner-form">
        <h2>hola</h2>
        <FormComponent :tittle="this.login"  />
    </div>
</template>

<script>
    
    import FormComponent from '@/components/Forms/FormComponent.vue'
    //import Background from '@/components/animatedBackground/Background.js'
    /*

    <canvas v-if="canvasInit" id="stars" width="300" height="300"       class="background-animated">
        <div class="conteiner-component-form">
            <FormComponent />
        </div>
    </canvas>

        .background-animated{
        background-color: var(--color4);
        background: radial-gradient(ellipse at center, var(--color2Gradiente), var(--color1Gradiente));
    }

    #stars {
        display: block;
        position: relative;
        width: 100%;
        height: 16rem;
        height: 100vh;
        z-index: 1;
    }    
    */
    export default{
        components:{
            FormComponent
        },

        data: () => {
            return{
                login: 'Login'
            }
        }
    }

</script>

<style>
    .component-conteiner-form{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

