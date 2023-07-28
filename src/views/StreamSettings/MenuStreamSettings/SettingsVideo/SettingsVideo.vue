<template>
    <div class="conteiner-Settings-video">
        <h2>Video Section</h2>
        <TabSetting />
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

</style>