<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuDisplay @openBar="openBar" :items="dataComponent" :section="dataSection.LogoTypeVideo" />
            
            <aside :class="[isExpandedOpenBar && 'is-expanded']">
                    <SettingsAlarmVue :itemSelected="itemClicked" v-if="dataSection.tittle == 'saida'" />
                    <SettingSaving :itemSelected="itemClicked" v-if="dataSection.tittle == 'audio'" />
                    <SettingsVideo :itemSelected="itemClicked" v-if="dataSection.tittle == 'video'" />
            </aside>
        
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
                isExpandedOpenBar: false,
                itemClicked : ''
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

            openBar(item){
                this.isExpandedOpenBar = this.itemClicked != item || this.itemClicked == ''  ? true : !this.isExpandedOpenBar
                this.itemClicked = item 
            }
        }
    }
</script>

<style>

    aside{
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: var(--color1Gradiente);
        overflow: hidden;
        min-height: 100vh;
        width: 0%;

        transition: width 0.5s ease;
        transition-timing-function: linear;

        overflow-y: scroll;
    }

    .is-expanded{
        width: 40%;
        display: flex;
        flex-direction: row;
        align-items: flex-start; 
    }

    .containerDisplay{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;

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

</style>