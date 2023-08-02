<template>
    <div>
        <navBar /> 
        <router-view></router-view>
    </div>
</template>
<script>
    import navBar from '@/components/navBar/navBar.vue'

    export default {
        components:{
            navBar
        }
    }
</script>