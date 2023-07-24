<template>
    <div class="bar">
        <MenuSlidingLinks />
    </div>
</template>

<script>
    import MenuSlidingLinks from './MenuSlidingLinks.vue';
    
    export default {
        components: {
            MenuSlidingLinks
        }
    }
</script>

<style>

.bar{
    display: flex;
    width: 10%;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #2B4C7E;
}
</style>