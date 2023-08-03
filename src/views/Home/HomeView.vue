<template>
    <div>
        <navBar /> 
        <Particles />
    </div>
</template>
<script>
    import navBar from '@/components/navBar/navBar.vue'
    import Particles from '@/components/Particles/Particles.vue';

    export default {
        components:{
            navBar,
            Particles
        }
    }
</script>