<template>
    <div>
        <navBar /> 
        <Particles :colorCircle="this.colorParticles.colorCircle" :colorShape="this.colorParticles.colorShape" :colorLine="this.colorParticles.colorLine" :value="this.colorParticles.value" />
    </div>
</template>
<script>
    import navBar from '@/components/navBar/navBar.vue'
    import Particles from '@/components/Particles/Particles.vue';

    export default {

        data: () => {
            return{
                colorParticles: { 
                    colorCircle: '#0f1b2e',
                    colorShape: '#0a121f',
                    colorLine: '#0a121f',
                    value: 30
                }
            }
        },

        components:{
            navBar,
            Particles
        }
    }
</script>