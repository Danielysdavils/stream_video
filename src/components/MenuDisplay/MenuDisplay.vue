<template>
        <div  class="">
            <div class="conteiner-section-item">
                <div class="itemDisplay" v-for="tool in setToolsToRender" v-bind:key="tool.id" >
                    <div 
                        class="conteiner-itemDisplay" 
                        v-on:click="setItemClicked(tool.name)">
                        <router-link to="#" class="item-link">
                            <ItemMenuDisplay 
                            :Clicked="itemClicked" 
                            :Sendsrc="tool.style.icone" 
                            :Sendtext="tool.name"/>
                        </router-link>
                    </div>
                </div>
            </div>

            <AsideMenuDisplay :sectionSelected="optionSelected" :dataSelected="itemClicked" :isExpandedAside="isExpandedAside" :width="dinamicWidth" />
        </div>
</template>

<script>
    import ItemMenuDisplay from '@/components/MenuDisplay/ItemMenuDisplay.vue'
    import AsideMenuDisplay from '@/components/MenuDisplay/AsideMenuDisplay.vue'

    //CLASS
    import VideoTools from '@/class/Video/VideoTools'
    import AudioTools from '@/class/Audio/AudioTools'
    import OutputTools from '@/class/Output/OutputTools'

    export default{
        data: () => {
            return{
                tools : {
                    videoTools: new VideoTools(),
                    audioTools: new AudioTools(),
                    outputTools: new OutputTools()
                },

                section : '',
                itemClick : '',
                itemClicked:'',
                isExpandedAside: false
            }
        },
        props:['optionSelected'],
        
        components:{
           ItemMenuDisplay,
           AsideMenuDisplay
        },

        computed: {
            setToolsToRender(){
                let data = []
                switch(this.optionSelected){
                    case 'Video' : 
                        data = this.tools.videoTools.tools;
                        break;
                    case 'Audio':
                        data = this.tools.audioTools.tools;
                        break;
                    case 'Output':
                        data = this.tools.outputTools.tools;
                        break;
                }
                return data;
            },

            reajustAside(){
                if(isExpandedAside){
                    return {
                        "--widthComponen" : "50%"
                    }

                }else{
                    return{
                        "--widthComponen" : "10%"
                    }
                }
            }
        },

        methods: {
            setItemClicked(element){
                this.itemClick = element

                this.openAside();
            },

            openAside(){
                this.isExpandedAside = this.itemClicked != this.itemClick || this.itemClicked == ''  ? true : !this.isExpandedOpenBar
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
    color: var(--color4);
}

.container-item-display{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.conteiner-section-item{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color2Gradiente);
}

.conteiner-itemDisplay{
    height: 100%;
}

.itemDisplay{
    height: 10%;
    margin-top: 15px;
}

.item-link:link, .item-link:visited{
    text-decoration: none;
    color: var(--color4);
}

</style>