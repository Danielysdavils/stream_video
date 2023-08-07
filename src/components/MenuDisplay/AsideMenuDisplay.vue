<template>
    <aside :class="[isExpandedAside && 'is-expanded']">
        <SettingsAlarmVue :itemSelected="dataSelected" v-if="sectionSelected == 'Output'" />
        <SettingSaving :itemSelected="dataSelected" v-if="sectionSelected == 'Audio'" />
        <SettingsVideo :itemSelected="dataSelected" v-if="sectionSelected == 'Video'" />
    </aside>
</template>

<script>
    import SettingsAlarmVue from '@/views/StreamSettings/MenuStreamSettings/SettingsAlarm/SettingsAlarm.vue'
    import SettingSaving from  '@/views/StreamSettings/MenuStreamSettings/SettingsSaving/SettingsSaving.vue'
    import SettingsVideo from '@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue' 

    export default{
        props: ['dataSelected', 'isExpandedAside', 'sectionSelected'],

        components: {
            SettingsAlarmVue,
            SettingSaving,
            SettingsVideo
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
    }

    .is-expanded{
        width: 70%;
        display: flex;
        flex-direction: row;
        align-items: flex-start; 
    }
</style>