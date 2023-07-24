<template>
    <div class="containerSettingsVideo">
        <MenuDisplay v-bind:qtdTabs = "[]" />
    </div>
</template>

<script>
    import MenuDisplay from '../../../../components/MenuDisplay/MenuDisplay.vue'

    export default{
        components : {
            MenuDisplay
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