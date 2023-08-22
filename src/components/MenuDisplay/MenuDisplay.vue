<template>
    <div class="conteiner-menuDisplay" :style="reajustConteiner">
        <div class="conteiner-section-item" :style="reajustSection">   
            <div class="separation-item-menu">
                <div class="itemDisplay" v-for="tool in setToolsToRender" v-bind:key="tool.id" >
                    <div 
                        class="conteiner-itemDisplay" 
                        v-on:click="setItemClicked(tool.name, tool.id)">
                        <router-link to="/streamconfig" class="item-link">
                            <ItemMenuDisplay 
                            :Clicked="itemClicked" 
                            :Sendsrc="tool.style.icone" 
                            :Sendtext="tool.name"/>
                        </router-link>
                    </div>
                </div>
            </div>    
            
            <div class="cont-logo-mtw">
                <LogoMTW 
                    :flexDirection="'column'" 
                    :margin-children="'0px'" />
            </div>
        </div>

        <AsideMenuDisplay 
            :sectionSelected="optionSelected" 
            :isExpandedAside="isExpandedAside" />
    </div>
</template>

<script>
    import ItemMenuDisplay from '@/components/MenuDisplay/ItemMenuDisplay.vue'
    import AsideMenuDisplay from '@/components/MenuDisplay/AsideMenuDisplay.vue'
    import LogoMTW from '../Logo/LogoMTW.vue'

    //Import das opções do top menu [ferramentas de configurações]
    import VideoTools from '@/class/Video/VideoTools'
    import AudioTools from '@/class/Audio/AudioTools'
    import OutputTools from '@/class/Output/OutputTools'
    import InputTools from '@/class/Input/InputTools'
    import StreamingTools from '@/class/Streaming/StreamingTools'
    //
    
    import store from '@/store/store'

    export default{
        data: () => {
            return{
                tools : {
                    videoTools: new VideoTools(),
                    audioTools: new AudioTools(),
                    outputTools: new OutputTools(),
                    inputTools: new InputTools(),
                    streamingTools: new StreamingTools()
                },

                itemClick : '',
                itemClicked:'',
                isExpandedAside: false
            }
        },
        props:['optionSelected'],
        
        components:{
           ItemMenuDisplay,
           AsideMenuDisplay,
           LogoMTW
        },

        computed: {
            setToolsToRender(){
                
                console.log(this.optionSelected);
                let data = []
                switch(this.optionSelected){
                    case 'Video' : 
                        data = this.tools.videoTools.tools;
                        break;
                    case 'Audio':
                        data = this.tools.audioTools.tools;
                        break;
                    case 'streaming':
                        data = this.tools.streaming.tools;
                        break; 
                    case 'Output':
                        data = this.tools.outputTools.tools;
                        break;
                    case 'Input':
                        data = this.tools.inputTools.tools;
                }
                return data;
            },
            
            reajustConteiner(){
                if(this.isExpandedAside) return {"--WidthConteiner" : "50%"}    
                else return {"--WidthConteiner" : "10%"}
            },

            reajustSection(){
                if(this.isExpandedAside) return {"--widthMenu" : "30%"}    
                else return {"--widthMenu" : "100%"}
            }
        },

        methods: {
            setItemClicked(element, id){
                this.itemClick = element;
                
                store.dispatch('setIdSlide', id);
                
                this.openAside();
            },

            openAside(){
                this.isExpandedAside = this.itemClicked != this.itemClick || this.itemClicked == ''  ? true : !this.isExpandedAside;

                this.itemClicked = this.itemClick; 
            }
        }
    }

</script>

<style>
.container-parent{
    background-color: var(--color4);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.conteiner-menuDisplay{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: var(--WidthConteiner);
    color: var(--color4);

    transition: width 1s ease;
    transition-timing-function: linear;
}

.separation-item-menu{
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    overflow-y: auto;
}

.container-item-display{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.conteiner-section-item{
    height: 100%;
    width: var(--widthMenu);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color2Gradiente);

    transition: width 0.5s ease;
    transition-timing-function: linear;
}

.conteiner-itemDisplay{
    height: 100%;
    width: 100%;
}

.itemDisplay{
    height: 18%;
    width: 100%;
    margin-top: 5px;
    display: flex;
    align-items: center;
}

.item-link:link, .item-link:visited{
    text-decoration: none;
    color: var(--color4);
}

.cont-logo-mtw{
    width: 100%;
    height: 20%;

    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
}

@media (min-width: 0px) and (max-width: 800px){
    .conteiner-menuDisplay{
        height: 12%;
        width: 100%;
        flex-direction: column;
    }

    .separation-item-menu{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .conteiner-section-item{
        display: flex;
        flex-direction: row;
        width: 100%;
    
    }

    .itemDisplay{
        height: 100%;
    }

    .cont-logo-mtw{
        width: 0%;
        display: none;
    }
}

</style>