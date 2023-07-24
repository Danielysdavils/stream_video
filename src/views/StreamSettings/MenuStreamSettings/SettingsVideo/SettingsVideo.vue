<template>
    <div class="containerSettingsVideo">
        <MenuDisplay />
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
                tabData: []
            }
        },
        methods: {
            setTabData(){
                const tab = ['Video', 'Image']
                this.tabData.push(tab)
                this.$emit('sendData', this.tabData);
            }
        }
    }
</script>