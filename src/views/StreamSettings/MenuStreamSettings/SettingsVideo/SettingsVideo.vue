<template>
    <div class="conteiner-Settings-video">
        <div class="tittle-section"></div>
        <TabSetting />
        <div class="scrollBar"></div>
    </div>
</template>

<script>
    import TabSetting from '../../../../components/Tabs/TabSetting.vue'

    export default{
        components : {
            TabSetting
        },
        data(){
            return{
                tabData: ['Video', 'Image']
            }
        },
        methods: {
            setTabData(){
                this.qtdTabs = this.tabData
            }
        }
    }
</script>

<style>
    .conteiner-Settings-video{
        width: 97%;
    }

    .tittle-section{
        width: 100%;
        height: 12%;
    }

</style>