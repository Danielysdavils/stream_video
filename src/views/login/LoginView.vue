<template>
    <div class="component-conteiner-form">
        <FormComponent :tittle="this.login"  @sendData="reciveData" />

        <div class="copy-right">
            <h5 class="copy-right-tittle">Develop by</h5>
            <h2 class="mtwLogo">MTW</h2>
        </div>

        <Particles :colorCircle="this.colorParticles.colorCircle" :colorShape="this.colorParticles.colorShape" :colorLine="this.colorParticles.colorLine" :value="this.colorParticles.value" />
    </div>
</template>

<script>
    import FormComponent from '@/components/Forms/FormComponent.vue'
    import Particles from '@/components/Particles/Particles.vue'
    import userModule from '@/store/Modules/UserModule'

    export default{
        components:{
            FormComponent,
            Particles
        },

        data: () => {
            return{
                login: 'Login',
                colorParticles: { 
                    colorCircle: '#b68c31',
                    colorShape: '#0a121f',
                    colorLine: '#0a121f',
                    value: 30
                }
            }
        },

        methods: {

            reciveData(d){
                console.log(d);
                userModule.dispatch('saveUser', d);
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
        justify-content: center;
    }

    .copy-right{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 4;
        width: 40%;

        margin-top: 40px;
    }

    .copy-right-tittle{
        font-size: 15px;
        margin-right: 10px;
    }

</style>

