<template>
    <div class="conteiner-home">
        <navBar />

        <div class="conteiner-homeDisplay">
            <TopMenu 
                @itemClicado="setTopMenu" 
                
                :OptionsLeft="dataMenuLeft" 
                :OptionRigth="dataMenuRight"/>

            <div class="video-sec">
                <div class="welcome-section">
                    <div class="row-Welcome"></div>
                    <h2 class="tittle-welcome-section">{{$t('welcome')}},</h2>
                    <h2 class="tittle-welcome-section">{{ this.nameUser}}!</h2>
                </div>
                <StreamSection 
                    :BorderColor="'var(--color1)'" 
                    :BoxShadow="'1px 1px 10px var(--color1)'" />

                <CarouselCameras />

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
    import CarouselCameras from '@/components/Carousel/CarouselCameras.vue';

    //Icone
    import UserService from '@/class/User/UserService'
    import LenguagesService from '@/class/Lenguages/LenguagesService'
    import ConfigService from '@/class/Config/ConfigService' 

    //Tools
    import ConfigTools from '@/class/Config/ConfigTools'
    import UserTools from '@/class/User/UserTools'
    import LenguagesTools from '@/class/Lenguages/LenguagesTools'

    //
    import Lenguages from '@/class/Lenguages/Lenguages'

    export default {

        data: () => {

            return{

                colorParticles: { 
                    colorCircle: '#cdcfd4',
                    colorShape: '#0a121f',
                    colorLine: '#0a121f',
                    value: 20
                },

                dataMenuLeft : [
                    {id: 1, section: 'home', data: new ConfigService(), tools: new ConfigTools()},
                    {id: 2, section: 'home', data: new LenguagesService(), tools: new LenguagesTools()}
                ],

                dataMenuRight: [ 
                    {id: 1, section: 'home', data: new UserService(), tools: new UserTools()}
                ],

                nameUser : store.getters.user
            }
        },
        
        methods: {
            setTopMenu(item, dropdown){
                const lenguages = new Lenguages(dropdown);

                switch(item){
                    case 'settings':

                        break;
                    case 'lenguages':
                        lenguages.setLenguages();
                        break;
                }
            }
        },

        components:{
            navBar,
            Particles,
            TopMenu,
            StreamSection,
            CarouselCameras
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

        justify-content: flex-start;
        font-family: var(--FontLabel);
    }

    .tittle-welcome-section{
        margin-right: 10px;
        color: var(--color2);
    }

    .row-Welcome{
        width: 2px;
        height: 35px;
        border-radius: 10px;
        background-color: var(--color2);
        margin-right: 10px;
    }

    @media (min-width: 0px) and (max-width: 800px){
        .conteiner-homeDisplay{
            flex-direction: column-reverse;
            height: 92%;
        }   
    }

</style>