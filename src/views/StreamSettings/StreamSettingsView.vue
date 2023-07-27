<template>
    <div class="containerDisplay">
        <div class="displayView">
            <MenuDisplay :items="dataComponent" />
            <router-view />

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
    
    export default{
        data: () => {
            return {
                dataComponent : []
            }
        },
        components: {
            MenuDisplay,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu
        },

        methods: {
            set(d){
                this.dataComponent = d 
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

    .displaySettings{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>