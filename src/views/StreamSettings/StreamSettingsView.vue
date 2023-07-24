<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuSliding />
            <StreamSection />
            <MenuVideoScrollBar />
        </div>

        <div class="displaySettings">
            <MenuStreamSettings />
            <router-view />
        </div>
    </div>
</template>

<script>
    import MenuSliding from '@/views/StreamSettings/MenuSliding/MenuSliding.vue'
    import MenuStreamSettings from '@/views/StreamSettings/MenuStreamSettings/MenuStreamSettings.vue'
    import MenuVideoScrollBar from '@/views/StreamSettings/MenuVideoScrollBar/MenuVideoScrollBar.vue'
    import StreamSection from '@/views/StreamSettings/StreamSection/StreamSection.vue'

    export default{
        components: {
            MenuSliding,
            MenuStreamSettings,
            MenuVideoScrollBar,
            StreamSection
        }
    }
</script>

<style>
    .containerDisplay{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0.5%;
    }

    .displayView{
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .displaySettings{
        width: 100%;
        height: 100%;
        display: flex;
        margin-top: 0.5%;
        background-color: black;
        border-radius: 3%;  
    }
</style>