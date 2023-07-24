<template>
    <div class="containerSettingsVideo">
        <MenuDisplay v-bind:tab-options="['Schedule', 'SD Storage']"/>
    </div>
</template>

<script lang="ts">
    import MenuDisplay from '../../../../components/MenuDisplay/MenuDisplay.vue'

    export default{
        components : {
            MenuDisplay
        }
    }
</script>