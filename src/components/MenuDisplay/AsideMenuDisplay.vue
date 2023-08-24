<template>
    <aside :class="[isExpandedAside && 'is-expanded']">
        <SettingsAudio 
            v-if="sectionSelected == 'Audio'" />
        
        <SettingsVideo 
            v-if="sectionSelected == 'Video'" />

        <SetingsInput 
            v-if="sectionSelected == 'Input'" />

        <SettingsOutput
            v-if="sectionSelected == 'Output'" />

    </aside>
</template>

<script>
    import SettingsAudio from '@/views/StreamSettings/MenuStreamSettings/SettingsAudio/SettingsAudio.vue'
    import SettingsVideo from '@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue'
    import SetingsInput from '@/views/StreamSettings/MenuStreamSettings/settingsInput/SettingsInput.vue'
    import SettingsOutput from '@/views/StreamSettings/MenuStreamSettings/SettingsOutput/SettingsOutput.vue' 

    export default{
        props: ['isExpandedAside', 'sectionSelected'],

        components: {
            SettingsVideo,
            SettingsAudio,
            SetingsInput,
            SettingsOutput
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

    @media (min-width: 0px) and (max-width: 800px){
        aside{
            min-height: 70vh;
            background-color: rgba(10, 18, 31, 0.9);
        }
        
        .is-expanded{
            width: 100%;
            z-index: 20;
        }
    }

</style>