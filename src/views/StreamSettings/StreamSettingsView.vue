<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuDisplay @openBar="openBar" :items="dataComponent" :section="dataSection.LogoTypeVideo" />
            
            <div v-if="isExpandedOpenBar">
                <SettingsAlarmVue v-if="dataSection.tittle == 'saida'" />
                <SettingSaving v-if="dataSection.tittle == 'audio'" />
                <SettingsVideo v-if="dataSection.tittle == 'video'" />
                    
                <div class="HiddenBar"><img src="../../assets/conexao-de-nuvem (1).png" alt="" class="img-HiddenBar"></div>
            </div>
            
            <div class="displaySettings">
                <TopMenu  @setData ="set" />
                <StreamSection />
                <MenuVideoScrollBar />
            </div>
        </div>        
    </div>
</template>

<script>
    import MenuDisplay from '@/components/MenuDisplay/MenuDisplay.vue'
    import MenuVideoScrollBar from '@/views/StreamSettings/MenuVideoScrollBar/MenuVideoScrollBar.vue'
    import StreamSection from '@/views/StreamSettings/StreamSection/StreamSection.vue'
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue'
    import SettingsAlarmVue from './MenuStreamSettings/SettingsAlarm/SettingsAlarm.vue'
    import SettingSaving from  '@/views/StreamSettings/MenuStreamSettings/SettingsSaving/SettingsSaving.vue'
    import SettingsVideo from '@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue' 

    export default{
        data: () => {
            return {
                dataComponent : [],
                dataSection: {},
                isExpandedOpenBar: false
            }
        },
        components: {
            MenuDisplay,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu,
            SettingsAlarmVue,
            SettingSaving,
            SettingsVideo
        },

        methods: {
            set(d, s){
                this.dataComponent = d;
                this.dataSection = s
            },

            openBar(){
                this.isExpandedOpenBar = !this.isExpandedOpenBar
                this.$emit('toggle', this.isExpandedOpenBar)
            }
        }
    }
</script>

<style>
    .tool-bar{
        display: flex;
        flex-direction: column;

        width: 40%;
        overflow: hidden;
        min-height: 100vh;
        padding: 1rem;

    }

    .openAsideBar-active{
        transform: translateX(300px);
    }

    .containerDisplay{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    .displayView{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .is-expanded{
        width: 40%;
        display: flex;
    }

    .displaySettings{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .HiddenBar{
        width: 10%;
        height: 100%;
        display: flex;

        position: relative;
        top: 0;
        transition: 0.2s ease-in-out;
    }

    .img-HiddenBar{
        width: 30px;
        height: 30px;

        transition: 0.2s ease-in-out;
    }
    .img-HiddenBar {
        transform: translateX(0.5rem);    
    }


</style>