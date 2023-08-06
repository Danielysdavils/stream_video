<template>
    <div class="containerDisplay">
        <navBar />
        <div class="displayView">
            <MenuDisplay :optionSelected="dataSelected" />
           
            <div class="displaySettings">
                <TopMenu  @setData ="set" :Options="dataSection" />
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
    import navBar from '@/components/navBar/navBar.vue'

    //Clases
    import VideoService from '@/class/Video/VideoService'
    import OutputService from '@/class/Output/OutputService'
    import AudioService from '@/class/Audio/AudioService'

    export default{
        data: () => {
            return {
                dataSection: [{data: new VideoService(), id: 1}, {data: new OutputService(), id: 2}, {data: new AudioService(), id: 3}],
                dataSelected : ''
            }
        },
        components: {
            MenuDisplay,
            MenuVideoScrollBar,
            StreamSection,
            TopMenu,
            navBar
        },

        methods: {
            set(s){
                this.dataSelected = s
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