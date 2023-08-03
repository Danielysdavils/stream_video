<template>
    <div id='particles-js'></div>
</template>

<script>
    import 'particles.js/particles';
    const particlesJS = window.particlesJS;

    export default {
        name: 'ParticlesJS',

        mounted () {
            this.$nextTick(() => {
                this.initParticlesJS()
            })
        },

        methods: {
            initParticlesJS () {
      
            particlesJS('particles-js', {
                'particles': {
                'number': {
                    'value': 30,
                    'density': {
                    'enable': true,
                    'value_area': 800
                    }
                },
                'color': {
                    'value': '#b68c31'
                },
                'shape': {
                    'type': 'circle',
                    'stroke': {
                    'width': 0,
                    'color': '#0f1b2e'
                    },
                    'polygon': {
                    'nb_sides': 5
                    },
                    'image': {
                    'src': 'img/github.svg',
                    'width': 100,
                    'height': 100
                    }
                },
                'opacity': {
                    'value': 0.5,
                    'random': false,
                    'anim': {
                    'enable': false,
                    'speed': 1,
                    'opacity_min': 0.1,
                    'sync': false
                    }
                },
                'size': {
                    'value': 10,
                    'random': true,
                    'anim': {
                    'enable': false,
                    'speed': 80,
                    'size_min': 0.1,
                    'sync': false
                    }
                },
                'line_linked': {
                    'enable': true,
                    'distance': 300,
                    'color': '#0f1b2e',
                    'opacity': 0.4,
                    'width': 2
                },
                'move': {
                    'enable': true,
                    'speed': 12,
                    'direction': 'none',
                    'random': false,
                    'straight': false,
                    'out_mode': 'out',
                    'bounce': false,
                    'attract': {
                    'enable': false,
                    'rotateX': 600,
                    'rotateY': 1200
                    }
                }
                },
                'interactivity': {
                'detect_on': 'canvas',
                'events': {
                    'onhover': {
                    'enable': false,
                    'mode': 'repulse'
                    },
                    'onclick': {
                    'enable': true,
                    'mode': 'push'
                    },
                    'resize': true
                },
                'modes': {
                    'grab': {
                    'distance': 800,
                    'line_linked': {
                        'opacity': 1
                    }
                    },
                    'bubble': {
                    'distance': 800,
                    'size': 80,
                    'duration': 2,
                    'opacity': 0.8,
                    'speed': 3
                    },
                    'repulse': {
                    'distance': 400,
                    'duration': 0.4
                    },
                    'push': {
                    'particles_nb': 4
                    },
                    'remove': {
                    'particles_nb': 2
                    }
                }
                },
                'retina_detect': true
            })
            }
        }
    }
</script>

<style>

    #particles-js{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50% 50%;
        position: fixed;
        top: 0px;
        z-index:1;
    }

</style>