<template>
    <div class="conteiner-home">
        <navBar />

        <div class="conteiner-homeDisplay">
            <TopMenu @setData="set" :Options="dataMenu" />

            <div class="video-sec">
                <div class="welcome-section">
                    <h2 class="tittle-welcome-section">Welcome again, {{ this.nameUser }}!</h2>
                    </div>
                <StreamSection 
                    :BorderColor="'var(--color1)'" 
                    :BoxShadow="'1px 1px 10px var(--color1)'" />

                <Particles 
                    :colorCircle="this.colorParticles.colorCircle" 
                    :colorShape="this.colorParticles.colorShape" 
                    :colorLine="this.colorParticles.colorLine" 
                    :value="this.colorParticles.value" />
            </div>
        </div>
    </div>
</template>
<script>
    import navBar from '@/components/navBar/navBar.vue';
    import Particles from '@/components/Particles/Particles.vue';
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue';
    import StreamSection from '../StreamSettings/StreamSection/StreamSection.vue';
    import store from '@/store/store'

    export default {

        data: () => {
            return{
                colorParticles: { 
                    colorCircle: '#cdcfd4',
                    colorShape: '#0a121f',
                    colorLine: '#0a121f',
                    value: 20
                },

                dataMenu : [{id: 1, data: {name: 'Settings', icone: require('@/assets/settings.png')}}],

                nameUser : store.getters.user
            }
        },
        
        //Implementar barra inferior de opciones!
        methods: {
            set(d){
                return console.log(d);
            }
        },

        components:{
            navBar,
            Particles,
            TopMenu,
            StreamSection
        }
    }
</script>

<style>
    .conteiner-home{
        height: 100%;
        width: 100%;
    }

    .conteiner-homeDisplay{
        display: flex;
        flex-direction: column;
        
        height: 90%;
        width: 100%;
    }

    .video-sec{
        display: flex;
        flex-direction: column;
        height: 90%;
    }

    .welcome-section{
        width: 100%;
        margin-top: 20px;
        margin-left: 30px;

        display: flex;
        justify-content: center;
    }

    .tittle-welcome-section{
        width: 90%;
        color: var(--color2);
    }

    @media (min-width: 0px) and (max-width: 800px){
        .conteiner-homeDisplay{
            flex-direction: column-reverse;
            height: 92%;
        }   
    }

</style>