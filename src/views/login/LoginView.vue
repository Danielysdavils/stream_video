<template>
    <div class="component-conteiner-form">
        <FormComponent :tittle="this.login"  />
        <Particles />

        <div class="copy-right">
            <h5>Develop by</h5>
            <h2>My Tech Ware</h2>
        </div>
    </div>
</template>

<script>
    
    import FormComponent from '@/components/Forms/FormComponent.vue'
    import Particles from '@/components/Particles/Particles.vue'

    export default{
        components:{
            FormComponent,
            Particles
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
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .copy-right{
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 4;
        width: 40%;
    }

</style>

