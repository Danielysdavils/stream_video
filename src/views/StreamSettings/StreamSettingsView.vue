<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuSliding />
            <router-view />

            <div class="displaySettings">
                <TopMenu />
                <StreamSection />
                <MenuVideoScrollBar />
            </div>
        </div>        
    </div>
</template>

<script>
    import MenuSliding from '../StreamSettings/MenuSliding/MenuSliding.vue'
    import MenuVideoScrollBar from '@/views/StreamSettings/MenuVideoScrollBar/MenuVideoScrollBar.vue'
    import StreamSection from '@/views/StreamSettings/StreamSection/StreamSection.vue'
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue'

    export default{
        components: {
            MenuSliding,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu
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

    .displaySettings{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>