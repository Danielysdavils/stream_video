<template>
    <div>
        <h2>a</h2>
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