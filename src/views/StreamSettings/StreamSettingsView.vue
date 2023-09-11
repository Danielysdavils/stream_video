<template>
    <div class="containerDisplay">
        <navBar />

        <div v-if="getIsLoanding" class="Section-erro">
            <div class="section-cont">
                <div class="item-erro-style"><LoaderBlocks/></div>
                <h1 class="item-erro-style">{{ $t('loanding') }}</h1>
            </div>
        </div>

        <div v-if="getIsDisconnected" class="Section-erro">
            <div class="section-cont">
                <h1 class="item-erro-style">{{ $t('serverErro') }}</h1>
                <h1 class="item-erro-style">{{ $t('tryAgain') }}</h1>
                <img class="item-img-erro" src="../../assets/icones-tool/errorServer.png" alt="">
            </div>
        </div>

        <div v-if="getIsConnected" class="displayView">
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
                    :colorBackground="'var(--color1)'"
                    @activeDisplay="setHeightScreen" />
            </div>
        </div>        
    </div>
</template>

<script>
    import MenuDisplay from '@/components/MenuDisplay/MenuDisplay.vue'
    import LoaderBlocks from '@/components/Animations/Loader/LoaderBlocks.vue'
    import MenuVideoScrollBar from '@/views/StreamSettings/MenuVideoScrollBar/MenuVideoScrollBar.vue'
    import StreamSection from '@/views/StreamSettings/StreamSection/StreamSection.vue'
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue'
    import navBar from '@/components/navBar/navBar.vue'

    //Modulos das ferramentas
    import VideoService from '@/class/Video/VideoService'
    import OutputService from '@/class/Output/OutputService'
    import InputService from '@/class/Input/InputService'
    import AudioService from '@/class/Audio/AudioService'
    import UserService from '@/class/User/UserService'
    
    import store from '@/store/store'

    //Tools
    import UserTools from '@/class/User/UserTools'
    export default{
        data: () => {
            return {

                //Configura as ferramentas do menu superior do lado esquerdo
                dataMenuLeft: [
                    {data: new VideoService(), section: 'streamconfig' , id: 1, tools: null}, 
                    {data: new AudioService(), section: 'streamconfig', id: 2, tools: null},
                    {data: new OutputService(), section: 'streamconfig', id: 4, tools: null},
                    {data: new InputService(), section: 'streamconfig', id: 5, tools: null},
                ],

                //Configura as ferramentas do superior menu do lado direito
                dataMenuRight: [
                    {data: new UserService(), section:'streamconfig', id:5, tools: new  UserTools()}
                ],

                dataSelected : '',
                heightToStream: '80%',
                
              
                //Seta as animações do começo
                isLoanding: true,
                isConnected: false
            }
        },

        //Popula os dados do store Video, Audio, Input, Output
        async beforeMount(){   
            await store.dispatch('video/getVideoData');
            await store.dispatch('audio/getAudioData');
            await store.dispatch('output/getOutputData');
            await store.dispatch('input/getInputData');
        },

        computed: {
            
            getIsConnected(){
                return !this.isLoanding ? this.isConnected['isConnected'].status : this.setIsLoanding();
            },

            getIsDisconnected(){
                return !this.isLoanding ? this.isConnected['dontConnected'].status : this.setIsLoanding();
            },

            getIsLoanding(){
                this.setIsLoanding();
                return this.isLoanding;
            }
            
        },

        methods: {
            //Envia a opção q foi clicada
            set(s){     
                this.dataSelected = s
            },
            //Muda o comprimento do video strimando 
            setHeightScreen(isActive){
                this.heightToStream = isActive ? '60%' : '80%'
            },

            setIsLoanding(){
                this.isConnected = store.getters['connection/getConnectedToServer']

                setTimeout(() => {
                    this.isLoanding = false;
                }, 2000)
            }
            
        },

        components: {
            MenuDisplay,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu,
            navBar,
            LoaderBlocks
        }
    }
</script>

<style>
    .containerDisplay{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        
        background-image: url(../../assets/fondo9.png);
        background-size: cover;
        background-position: center;
    }

    .displayView{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 90%;
    }

    .displaySettings{
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .Section-erro, .section-cont{
        width: 100%;
        height: 90%;
        background-color: var(--color1);
        color: var(--color4);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-family: var(--FontLabel);
        font-size: 10px;
    }

    .section-cont{
        background-color: var(--color2Gradiente);
    }

    .item-erro-style{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px;
    }

    .item-img-erro{
        margin-top: 15px;
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