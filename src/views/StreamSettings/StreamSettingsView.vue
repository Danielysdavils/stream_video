<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuDisplay :items="dataComponent" :section="dataSection.LogoTypeVideo" />
            
            <div class="display-tools-bar">
                <SettingsAlarmVue v-if="dataSection.tittle == 'saida'" />
                <SettingSaving v-if="dataSection.tittle == 'audio'"/>
                <SettingsVideo v-if="dataSection.tittle == 'video'"/>
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
                dataSection: {}
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
    }

    .displayView{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .display-tools-bar{
        width: 30%;
    }

    .displaySettings{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>