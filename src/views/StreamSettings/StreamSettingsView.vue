<template>
    <div class="containerDisplay">
        <navBar />
        <div class="displayView">
            <MenuDisplay :optionSelected="dataSelected" />
           
            <div class="displaySettings">
                <TopMenu  
                    @itemClicadoWithoutDropDown ="set" 
                    :OptionsLeft="dataMenuLeft" 
                    :OptionRigth="dataMenuRight"/>

                <StreamSection 
                    :BorderColor="'var(--color4)'" 
                    :BoxShadow="'1px 1px 10px var(--color2)'"
                    :Height="heightToStream" />

                <MenuVideoScrollBar 
                    class="carousel-video"
                    @activeDisplay="setHeightScreen" />
            </div>
        </div>        
    </div>
</template>

<script>
    import MenuDisplay from '@/components/MenuDisplay/MenuDisplay.vue'
    import MenuVideoScrollBar from '@/views/StreamSettings/MenuVideoScrollBar/MenuVideoScrollBar.vue'
    import StreamSection from '@/views/StreamSettings/StreamSection/StreamSection.vue'
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue'
    import navBar from '@/components/navBar/navBar.vue'

    //Clases
    import VideoService from '@/class/Video/VideoService'
    import OutputService from '@/class/Output/OutputService'
    import AudioService from '@/class/Audio/AudioService'
    import UserService from '@/class/User/UserService'
    
    //Tools
    import UserTools from '@/class/User/UserTools'

    export default{
        data: () => {
            return {

                //Configura as ferramentas do menu superior do lado esquerdo
                dataMenuLeft: [
                    {data: new VideoService(), section: 'streamconfig' , id: 1, tools: null}, 
                    {data: new OutputService(), section: 'streamconfig', id: 2, tools: null}, 
                    {data: new AudioService(), section: 'streamconfig', id: 3, tools: null}
                ],

                //Configura as ferramentas do superior menu do lado direito
                dataMenuRight: [
                    {data: new UserService(), section:'streamconfig', id:5, tools: new  UserTools()}
                ],

                dataSelected : '',
                heightToStream: '74%'
            }
        },
        components: {
            MenuDisplay,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu,
            navBar
        },

        methods: {
            //Envia a opção q foi clicada
            set(s){        
                this.dataSelected = s
            },
            //Muda o comprimento do video strimando 
            setHeightScreen(isActive){
                this.heightToStream = isActive ? '60%' : '74%'
            }
        }
    }
</script>

<style>
    .containerDisplay{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;

        background-image: url(../../assets/fundo7.png);
        background-size: cover;
        background-position: center;
    }

    .displayView{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .displaySettings{
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    @media(min-width: 0px) and (max-width: 800px){
        .displayView{
            height: 92%;
            display: flex;
            flex-direction: column;
        }

        .displaySettings{
            width: 100%;
            flex-direction: column-reverse;
        }

        .carousel-video{
            display: none;
            height: 0%;
        }
    }
</style>