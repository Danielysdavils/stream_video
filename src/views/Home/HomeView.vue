<template>
    <div class="conteiner-home">
        <navBar />
        <TopMenu />
        <StreamSection /> 
        <Particles :colorCircle="this.colorParticles.colorCircle" :colorShape="this.colorParticles.colorShape" :colorLine="this.colorParticles.colorLine" :value="this.colorParticles.value" />
    </div>
</template>
<script>
    import navBar from '@/components/navBar/navBar.vue';
    import Particles from '@/components/Particles/Particles.vue';
    import TopMenu from '@/components/MenuDisplay/TopMenu.vue';
    import StreamSection from '../StreamSettings/StreamSection/StreamSection.vue';

    export default {

        data: () => {
            return{
                colorParticles: { 
                    colorCircle: '#0f1b2e',
                    colorShape: '#0a121f',
                    colorLine: '#0a121f',
                    value: 20
                }
            }
        },

        components:{
            navBar,
            Particles,
            TopMenu,
            StreamSection
        }
    }
</script>

<style>
    .conteiner-home{
        display: flex;
        flex-direction: column;
        
        height: 100%;
        width: 100%;
    }

</style>