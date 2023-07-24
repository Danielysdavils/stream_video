<template>
    <div ref="container" class="w-100 h-100 container">
        <ApexCharts :height="height" :width="width" ref="realtimeChart" class="grafico d-flex justify-content-center" type="area" :options="opcao" :series="dados"></ApexCharts>
        <div class="label w-100 text-center d-flex justify-content-center align-items-end" style="gap: 0.5rem">
            <h3>{{value}}</h3><h6 style="position:relative;top:-3px">{{unit}}</h6>
        </div>
    </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'
export default {
    components:{
        ApexCharts
    },
    props:{
        info:{
            type:Object,
            required:true
        },
        value:{
            type:Number,
            required:false,
        },
        fullscreen:{
			required:false,
			type:Boolean,
			default:false,
		}
    },
    computed:{
        unit(){
            return this.info.unit ? this.info.unit : 'unidade'
        },
    },
    methods:{
        resizeMeasurer(width, height){
            if(this.fullscreen){
                this.height = window.innerHeight / 100 * 50
                this.width = window.innerWidth   / 100 * 75
            }
            else{
                this.width  = width * 0.8
                this.height = height * 0.7
            }
        },
        updateSeriesLine() {
            this.$refs.realtimeChart.updateSeries([{
                data: this.valuesArray,
            }]);
        },
    },
    mounted(){
        this.counter = 0
        const refresh = (this.info.refreshRate * 1000) / this.info.points 
        const timeout = setTimeout(()=>{
            clearTimeout(timeout)
        },500)
        this.updateInterval = setInterval(()=>{
            this.counter += 1
            if(this.valuesArray.length == this.info.points) this.valuesArray.shift()
            this.valuesArray.push(this.value )
            try{
                if(this.counter == this.info.points){
                    this.updateSeriesLine()
                    this.counter = 0;
                }
            }catch (e){
                console.error(e)
            }

        }, refresh)
    },
    beforeDestroy(){
        clearInterval(this.updateInterval)
    },
    data(){
        return{
            counter: 0,
            width: 200,
            height: 200,
            valuesArray: [],
            dados: [{
                data: Array.from({length: this.info.points}, (_, i) => 0)
            }],

            opcao: {
                title:{text: ''},
                chart:{
                    redrawOnParentResize: true,
                    toolbar:{show:false},
                    type: 'line',
                    zoom:{enabled:false},
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                },
                dataLabels:{
                    enabled: false
                },

                stroke:{
                    curve:'smooth'
                },

                colors: ["#FF9E04"],
                
                fill:{
                    shade: 'dark',
                    colors: ["#FF9E04"]
                },
                grid:{
                    borderColor: ["#FF9E04"],
                    clipMarkers: false,
                    yaxis:{
                        lines:{show:false}
                    },
                },
                markers: {
                    size: 0,
                },
                tooltip:{
                    theme: "dark"
                },
                labels: Array.from({length: this.info.points}, (_, i) => i),
                xaxis:{
                    labels:{
                        show:false
                    }
                },
                yaxis:{
                    show: true,
                    forceNiceScale: true,
                    tickAmount: 3,
                    showAlways: true,
                    max: this.info.maximum,
                    min :this.info.minimum,
                    labels:{show:true, style:{colors:['white']}}
                },
                

            }
        }
    },
    
}
</script>

<style lang="scss" scoped>
    .container{
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>