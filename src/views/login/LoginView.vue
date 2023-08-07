<template>
    <div class="component-conteiner-form">
        <FormComponent :tittle="this.login"  @sendData="reciveData" />
        <LogoMTW :flexDirection="'row'"/>
        <Particles :colorCircle="this.colorParticles.colorCircle" :colorShape="this.colorParticles.colorShape" :colorLine="this.colorParticles.colorLine" :value="this.colorParticles.value" />
    </div>
</template>

<script>
    import FormComponent from '@/components/Forms/FormComponent.vue'
    import LogoMTW from '@/components/Logo/LogoMTW.vue'
    import Particles from '@/components/Particles/Particles.vue'
    import userModule from '@/store/Modules/UserModule'


    export default{
        components:{
            FormComponent,
            LogoMTW,
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
</style>

