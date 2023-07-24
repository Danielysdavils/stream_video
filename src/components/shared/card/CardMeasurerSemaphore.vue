<template>
    <div ref="container" class="w-100 h-100 d-flex align-items-center" :style="responsiveSizing">
        <div class="w-100">
            <div class="traficLight w-100 d-flex justify-content-center align-items-center mb-2" style="gap: 1rem">
                <div class="outter">
                    <div class="innerCircle w-100 h-100" :style="innerCircleColor" ref="innerCircle"></div>
                </div>
                <h1>{{status}}</h1>
            </div>

            <div class="label w-100 text-center">
                <h3>{{value}}</h3>
                <h6>{{unit}}</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return{
            cardWidth: 300,
            ratio: 1,
        } 
    },
    props:{
        value: {
            type: Number,
            required: false,
            default: 80,
        },
        info:{
            type: Object,
            required: true
        },
        fullscreen:{
			required:false,
			type:Boolean,
			default:false,
		},
        divisionsColorList:{
            type:Array,
            required:true
        }
    },
    computed:{
        responsiveSizing(){
            if(this.fullscreen){
                return {
                    "--outterCircleSize": `${window.innerWidth / 100 * 10}px`,
                    "--statusSize": `${window.innerWidth / 150 * 10}px`,
                    "--valueSize": `${window.innerWidth / 100 * 5}px`,
                    "--unitSize": `${window.innerWidth / 100 * 5}px`,
                }
            }

            var outterCircleNewSize = this.cardWidth * 0.1197
            var stautsNewSize = this.cardWidth * 0.0998
            var valueNewSize = this.cardWidth * 0.0625
            var unitNewSize = this.cardWidth * 0.04
            if(this.ratio < 0.34){
                outterCircleNewSize = outterCircleNewSize / 2.25
                stautsNewSize = stautsNewSize / 2.25
                valueNewSize = valueNewSize / 2.25
                unitNewSize = unitNewSize / 2.25
            }
            return {
                "--outterCircleSize": `${outterCircleNewSize}px`,
                "--statusSize": `${stautsNewSize}px`,
                "--valueSize": `${valueNewSize}px`,
                "--unitSize": `${unitNewSize}px`,
            }
        },
        unit(){
            return this.info.unit ? this.info.unit : 'unidade'
        },

        max(){
            return this.info.maximum  != undefined ? this.info.maximum : 100
        },
        innerCircleColor(){
            var color = undefined
            this.divisionsColorList.forEach(division => {
                const percentageValue = (this.value*100)/this.max
                if((percentageValue >= division.start && percentageValue <= division.end) || this.value >= this.max){
                    color = division.color
                }
            })

            return {"--innerCircleColor": color != undefined ? color : "yellow"}
        },

        status(){
            var status = undefined
            const percentageValue = (this.value*100)/this.max
            this.divisionsColorList.forEach(division => {
                if((percentageValue >= division.start && percentageValue <= division.end) || this.value >= this.max){
                    status = division.text
                }
            })
            return status != '' && status != undefined ? status : 'Status' 
        },
    },
    methods:{
        resizeMeasurer(w, h){
            this.ratio = h/w
            this.cardWidth = w
        },
    },
    mounted(){
        this.cardWidth = this.$refs.container.offsetWidth * 0.33
    },
}
</script>

<style scoped>
    .outter{
    height:var(--outterCircleSize);
    width: var(--outterCircleSize);
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.411);
    padding: 0.125rem;
    }
    .innerCircle{
    border-radius: 100%;
    background: var(--innerCircleColor);
    animation: blink 0.75s ease-in-out alternate-reverse infinite;
    }
    h1{
    font-size: var(--statusSize);
    }
    h3{
        font-size: var(--valueSize);  
    }
    h6{
        font-size: var(--unitSize);
    }
    @keyframes blink{
        0%{
            opacity: 0.625;
        }
        100%{
            opacity: 1;
        }
    }
</style>