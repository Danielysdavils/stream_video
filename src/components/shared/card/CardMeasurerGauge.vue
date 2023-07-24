<template>
    <div class="w-100 h-100 gaugeGrid">
        <div class="">
            <VueSvgGauge
            :start-angle="-90"
            :end-angle="90"
            :value="value"
            :separator-step="separatorStep"
            :min="0"
            :innerRadius="60"
            :separatorThickness="1"
            :max="max - min"
            :gauge-color="divisions "
            :scale-interval="scaleInterval">
                <div class="valueSpace">
                    <h2>{{ value }}</h2> 
                    <p> {{unit}}</p>
                </div>
            </VueSvgGauge>
        </div>
        <div class="d-flex justify-content-center minMaxContainer">
            <h4 class="text-danger">{{min}}</h4>
            <h4 class="text-success">{{max}}</h4>
        </div>
    </div>
</template>

<script>
import { VueSvgGauge } from 'vue-svg-gauge'

export default {
    components: {
        VueSvgGauge
    },
    props:{
        value: {
            type: Number,
            required: false,
        },
        info:{
            type: Object,
            required: true
        },
        divisionsColorList:{
            type:Array,
            required:true
        }
    },
    computed:{
        unit(){
            return this.info.unit ? this.info.unit : 'unidade'
        },
		min(){
			return this.info.minimum != undefined ? parseInt(this.info.minimum) : 0
		},
		max(){
			return this.info.maximum  != undefined ? parseInt(this.info.maximum) : 100
		},

        /**Função que converte o array de cores para adequar a biblioteca VueGaugeSvg  */
        divisions(){
            const divisionsList = []
            // um item na divisions color list tem inicio, fim e cor. Para funcionar com a biblioteca precisa ser cor e offset
            this.divisionsColorList.forEach(division => {
                divisionsList.push({
                    color: division.color,
                    offset: division.end
                })
            })
            return this.limitDivisions(divisionsList)
        },
        
        /** Calcula qual a distancia entre cada separador no gauge */
        separatorStep(){
            return (this.max - this.min) / 3 
        },
        scaleInterval(){
            return this.max /10
        }
    },
    methods:{
        resizeMeasurer(w,h){
            const foreignObject = this.$el.querySelector("ForeignObject") //Objeto do gauge
            const indicators = this.$el.querySelector(".minMaxContainer") //Objeto dos indicadores de minimo e maximo

            const style = window.getComputedStyle(indicators) //Estilos dos indicadores de minimo e maximo

            //Pega os valores da propriedade transform do alarme e o separa formando um array
            const matrix = style.transform.replaceAll("matrix(", "").replaceAll(")", "").split(", ")

            const lastTranslateYValue = isNaN(parseInt(matrix[5])) ? 0 : parseInt(matrix[5])
            const distanceY = foreignObject.getBoundingClientRect().bottom - indicators.getBoundingClientRect().top
            indicators.style.transform = `translateY(${distanceY + lastTranslateYValue}px)`
        },
        limitDivisions(array){
            const newArray = []
            array.forEach((item, index) => {
                var count = 0
                while(count <= 1){
                    if(index == 0){
                        if(count) newArray.push({
                            color: item.color,
                            offset: item.offset - 5
                        })
                        else newArray.push({
                            color: item.color,
                            offset: 0
                        })
                    }else{
                        if(count == 0) newArray.push({
                            color: item.color,
                            offset: array[index -1].offset + 5
                        })
                        else newArray.push({
                            color: item.color,
                            offset: item.offset
                        })
                    }
                    count += 1
                }
            })
            return newArray
        }
    },
    mounted(){
        //Faz com que as informções abaixo do gauge (unidade, valor, minimo e máximo) não sejam ocultadas 
        this.$el.querySelector("ForeignObject").style.overflow = 'visible'
    }
}
</script>

<style lang="scss" scoped>
.valueSpace{
    text-align: center;
    transform: translate(3rem, 3.5rem);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2{
        font-size: 1.85rem;
        margin: 0;
    }
    p{
        margin: 0;
        opacity: 1;
        font-size: 0.55rem;
    }
    
}
.minMaxContainer{
    gap: 55%;
}

.gaugeGrid{
    display: grid;
    grid-template-rows: 80% 20%;
}
.gaugeContainer{
    height: 100%;
    width: 100%
}
h2{
    font-size: 0.75rem;
}
</style>