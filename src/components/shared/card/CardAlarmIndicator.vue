<template>
    <div>
        <div class="measurerAlarmContainer" v-for="alarm in alarms" :ref="alarm.alarmRef">
            <p class="alarmName">
                {{alarm.alarmName}}
            </p>
            <div class="arrow"></div>
        </div>
    </div>
</template>

<script> 

export default {

    data(){
        return{
        }
    },

    props:{
        info:{
            type: Object,
            required: true
        },
        alarms: {
            type: Array,
            required:true
        }
    },

    methods:{

        /**
         * Função que é chamada quando há uma mudança nas dimenções do card do medidor para atualizar as posições 
         * dos alarmes
         * 
         * Cada alarme tem um container que envolve o elemento do nome e flecha na altura do valor a ser alarmado.
         * Há um forEach itera sob a lista de alarmes associados ao medidor que passa como parametro o container do alarme e suas informações
         */
        updateEachAlarmPositionAndSize(width, height){
            //alarms é definida em "data()"
            this.alarms.forEach(alarm => {
                /***
                 * this.$refs[alarm.alarmRef][0] -> {
                 *      this.$refs => seleciona todos os refs utilizados no componente
                 *      alarm.alarmRef => nome do ref associado ao elemento do DOM do alarme
                 *      this.$refs[alarm.alarmRef] => Referencia do elemento do DOM assiociado ao alarme
                 *      this.$refs[alarm.alarmRef][0] => Elemento do DOM do alarme
                 *  }
                 *      alarm => informações sobre o alarme que serão utilizadas para o posicionar no lugar certo
                 * 
                 */
                const alarmContainer = this.$refs[alarm.alarmRef][0]
                this.updateAlarmSize(alarmContainer, width, height)
                this.updateAlarmPositionAcordingToMeasurerType(alarmContainer, alarm)
            })
        },

        /**
         * Posiciona o elemento do alarme de acordo com o tipo de medidor que ele está sendo aplicado,
         * Por exemplo: Num medidor tipo vertical, o alarme será posicionado de acordo com a altura que corresponde
         *              ao valor do alarme;
         *              Num medidor do tipo gauge, o alarme será posicionado de acordo com a altura, 'distancia' do
         *              inicio em que a barra colorida se encontra e de acordo com a rotação do arco.
         * 
         * Ou seja, cada medidor tem um jeito unico de posicionar o alarme, assim como os elementos que ele tomará como 
         * base para se referenciar na hora de posicionar
         * 
         * @param container      : Elemento do alarme;
         * @param alarmInfo      : Informações do alarme, como valor do alarme e nome.
         */
        updateAlarmPositionAcordingToMeasurerType(container, alarmInfo){
            var positions = {}

            // Verifica se o elemento do medidor já foi renderizado
            if(this.$parent.$refs.measurer != undefined){       

                if(this.info.name == 'vertical' || this.info.name == 'thermometer' || this.info.name == 'cylinder') positions = this.getPositionValuesToAlarmInVerticalMeasurers(container, alarmInfo)
                else if (this.info.name == 'chart' || this.info.name == "barchart") positions = this.getPositionValuesToAlarmInSvgMeasurers(container, alarmInfo)
                else if(this.info.name == 'linear-gauge') positions = this.getPositionValuesToAlarmInHorizontalMeasurer(container, alarmInfo)
                else positions = this.getPositionValuesToAlarmInGaugeMeasurer(container, alarmInfo)
                
                //aplica o estilo no container do alarme
                container.style.transform = `translateY(${positions.verticalAlarmPosition}px) translateX(${positions.horizontalAlarmPosition}px) rotate(${positions.rotateAlarmDegree}deg)`

                // Entra nesse caso o container de alarme que tem rotação para remover a rotação do texto, o deixando horizontal 
                if(positions.rotateAlarmDegree != 0){
                    const alarmNameElement = container.children[0] // elemento do texto
                    alarmNameElement.style.transform = `rotate(-${positions.rotateAlarmDegree}deg)` // inverte a rotação par ao deixar normal
                }
            }
        },
        
        /**
         * Função para posicionar o alarme no medidor vertical, termometro ou cilindro
         * 
         * @param container       Elemento do alarme;
         * @param alarmInfo       Informações do alarme, como valor do alarme e nome.
         * 
         * @return Objeto que informa as posições X, Y e a angulação do alarme
         */
        getPositionValuesToAlarmInVerticalMeasurers(container, alarmInfo){
            const positionsToBeReturned =  {
                horizontalAlarmPosition: undefined,
                verticalAlarmPosition: undefined,
                rotateAlarmDegree: 0 //Não é necessário rotacionar o container do alarme para o posicionar de acordo
            }
            //Como três medidores diferentes seguem o mesmo padrão, deve ser especificado qual tipo de posição ele vai se basear
            const measurerTypeQuerySelector = {
                vertical: '.verticalContainer',
                thermometer : '.termometer',
                cylinder: '.cylinder'
            }

            //Elemento que o alarme se vai se basear para ser posicionado
            const element = this.$parent.$refs.measurer.$el.querySelector(measurerTypeQuerySelector[this.info.name])
            // Verifica se o elemento do medidor já foi renderizado
            if(element != undefined){
                // A posição vertical em que o alarme vai ficar posicionado quando o valor do alarme é o mesmo que o valor máximo do medidor
                const alarmPosWhenMax = element.offsetTop - (container.offsetHeight / 2)
                const elementHeight = element.offsetHeight

                // Pega a 'altura' do valor do alarme e o inverte fazendo a subtração da altura total da barra, fazendo com que seja a distancia a partir do topo 
                var distanceFromTopOfMeasurer = (elementHeight - (elementHeight * (alarmInfo.alarmValue /this.info.maximum)))

                positionsToBeReturned.verticalAlarmPosition = alarmPosWhenMax + distanceFromTopOfMeasurer

                //Pega todos os estilos aplicados no container do alarme
                const style = window.getComputedStyle(container)

                //Pega os valores da propriedade transform do alarme
                const matrix = new WebKitCSSMatrix(style.transform)

                //armazena o valor que representa o ultimo valor de transformX
                const lastTranslateXValue = matrix.m41

                // Pega a distancia do extremo esquerdo do elemento e substrai pelo extremo direto do container do alarme, resultando na distancia horizontal entre os dois
                const horizontalDistance = element.getBoundingClientRect().left - container.getBoundingClientRect().right

                // Posição atual + distancia entre eles
                positionsToBeReturned.horizontalAlarmPosition = lastTranslateXValue + horizontalDistance
            }
            
            return positionsToBeReturned
        },
        
        /**
         * Função para posicionar o alarme no medidor de gráfico de área ou de barras
         */
        getPositionValuesToAlarmInSvgMeasurers(container, alarminfo){
            const positionsToBeReturned =  {
                horizontalAlarmPosition: 0, // Não precisa definir a distancia horizontal pois o eixo Y fica numa posição fixa
                verticalAlarmPosition: undefined,  
                rotateAlarmDegree: 0 //Não é necessário rotacionar o container do alarme para o posicionar de acordo
            }
            //Elemento que engloba o gráfico
            const svgContainer = this.$parent.$refs.measurer.$el
            
            //Tamanho do svg que representa o gráfico
            const svgChartHeight = this.$parent.$refs.measurer.height

            // A posição vertical em que o alarme vai ficar posicionado quando o valor do alarme é o mesmo que o valor máximo do medidor
            var alarmPosWhenMax = Math.abs(svgContainer.offsetTop) + (container.offsetHeight / 2)
            
            if(this.info.name == "BarChart"){
                alarmPosWhenMax += ((svgContainer.offsetHeight - svgChartHeight) / 2)
                const textLabel = svgContainer.children
                console.log(textLabel)
            }else{
                const textLabel = svgContainer.querySelector(".apexcharts-yaxis").querySelector("text")
                //Pega todos os estilos aplicados no container do alarme
                const style = window.getComputedStyle(container)
                //Pega os valores da propriedade transform do alarme e o separa formando um array
                const matrix = style.transform.replaceAll("matrix(", "").replaceAll(")", "").split(", ")
                
                const lastTranslateXValue = isNaN(parseInt(matrix[4])) ? 0 : parseInt(matrix[4])
                
                positionsToBeReturned.horizontalAlarmPosition = lastTranslateXValue + textLabel.getBoundingClientRect().left - container.getBoundingClientRect().right

            }
            const distanceFromTopOfMeasurer = (svgChartHeight - (svgChartHeight * (alarminfo.alarmValue /this.info.maximum)))
            
            positionsToBeReturned.verticalAlarmPosition = alarmPosWhenMax + distanceFromTopOfMeasurer
            return positionsToBeReturned
        },

        /** 
         * Função para posicionar o alarme no medidor de gauge linear 
         */
        getPositionValuesToAlarmInHorizontalMeasurer(container, alarmInfo){
            const positionsToBeReturned = {
                horizontalAlarmPosition: undefined,
                verticalAlarmPosition: undefined,
                rotateAlarmDegree: 90
            }
            
            
            // Distancia do topo do card até o topo do medidor
            const verticalContainer = this.$parent.$refs.measurer.$el.querySelector(".item")
            const verticalPosition = verticalContainer.getBoundingClientRect().top - container.getBoundingClientRect().bottom

            const style = window.getComputedStyle(container)
            //Pega os valores da propriedade transform do alarme e o separa formando um array
            const matrix = style.transform.replaceAll("matrix(", "").replaceAll(")", "").split(", ")
            
            const lastTranslateYValue = isNaN(parseInt(matrix[5])) ? 0 : parseInt(matrix[5 ])

            // Posição do indicador do alarme quando o valor é igual o valor máximo do display
            const horizontalPositionWhenMax = this.$parent.$refs.measurer.$el.offsetWidth

            // Posição do indicador do alarme para o valor configurado do alarme
            var horizontalPosition = ((horizontalPositionWhenMax * alarmInfo.alarmValue) / this.info.maximum)

            //Não deixa o indicador do alarme ser maior que o valor maximo
            horizontalPosition = horizontalPosition > horizontalPositionWhenMax ? horizontalPositionWhenMax : horizontalPosition

            positionsToBeReturned.verticalAlarmPosition = verticalPosition + lastTranslateYValue
            positionsToBeReturned.horizontalAlarmPosition = horizontalPosition
            

            return positionsToBeReturned
        },

        /**
         * Função para posicionar o indicador de alarme no Gauge
         */
        getPositionValuesToAlarmInGaugeMeasurer(container, alarmInfo){

            const alarmValue = alarmInfo.alarmValue //Valor do alarme 
            const alarmAngle = (alarmValue * 180) / this.info.maximum // Angulo respectivo ao valor do alarme

            const alarm = container
            // Zera as transformações menos o rotate para poder calcular o centro do gauge corretamente  
            alarm.style.transform = `translateY(0px) translateX(0px) rotate(${alarmAngle}deg)` 
            const alarmDimensions = alarm.getBoundingClientRect() //dimensões do alarme

            const gaugeContainer = this.$parent.$refs.measurer.$el.children[0] //Container que envolve o gauge
            const gaugeContainerDimensions = gaugeContainer.getBoundingClientRect()// Dimensões do container

            const gaugeSvg = gaugeContainer.children[0].querySelector("foreignObject") //Svg do gauge
            const gaugeSvgDimensions = gaugeSvg.getBoundingClientRect()//Dimensões do svg

            //Onde está localizado o meio horizontal do gauge
            var centerX = gaugeContainerDimensions.left - alarmDimensions.right + gaugeContainer.offsetWidth / 2
            
            // Onde está localizado o meio vertical do gauge. Como é um semi-circulo vai ser sua base
            const centerY = gaugeSvgDimensions.bottom - alarmDimensions.bottom

            const radius = gaugeSvgDimensions.height //raio do gauge

            //Distancia do centro do gauge até a posição do alarme
            const y = centerY - Math.sin(alarmAngle * Math.PI/180) * radius
            var x = centerX - Math.cos(alarmAngle * Math.PI/180) * radius 


            // Alinha as posições dos alarmes com angulo maior ou igual a 90 
            if(alarmAngle >= 120){
                x += alarm.offsetWidth
            }else if(alarmAngle > 90){
                x += alarm.offsetWidth * 2/3
            }else if(alarmAngle == 90){
                x += alarm.offsetHeight/2
            }

            return {horizontalAlarmPosition: x, verticalAlarmPosition: y, rotateAlarmDegree: alarmAngle }

        },

        /**
         * Atualiza o tamanho do ponteiro e do texto do alarme de acordo com a área do card 
         */
        updateAlarmSize(container, width, height){

            // Retorna a razão por um valor escolhido a partir da área do card
            const getAreaDividedByNumber = (divisor) => (width * height) / divisor
            
            var pointerSize = getAreaDividedByNumber(85000)

            //O ponteiro deve ter pelo menos 5px
            pointerSize = pointerSize < 5 ? 5 : pointerSize

            const pointerSizeInPixel = `${pointerSize}px`

            var textSize = getAreaDividedByNumber(20000)
            
            //O texto deve ter pelo menos 16px
            textSize = textSize < 16 ? 16 : textSize    
            
            const pointer = container.children[1]
            const text = container.children[0]

            text.style.fontSize = `${textSize}px`

            pointer.style.borderLeftWidth = pointerSizeInPixel
            pointer.style.borderRightWidth = pointerSizeInPixel
            pointer.style.borderBottomWidth = pointerSizeInPixel

        }

    },
    mounted(){ 
    }
}
</script>

<style scoped lang="scss">
.measurerAlarmContainer{
    display: flex;
    align-items: center;
    position: absolute;
    gap: 0.4rem;
    top: 0;
    left: 0;
    
    p{
        color: white;
        margin: 0;
        opacity: 0
    }
    .arrow{
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #f3324f;
        transform: rotate(90deg);
    }
    &:hover{
        p{
            color: #f3324f;
            opacity: 0.5
        }
    }
}
</style>