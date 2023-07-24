<template>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'BarChart',

    data(){
        return{
            //É iniciado com valores zerados para determinar a quantidade de barras que o gráfico vai apresentar
            data: [{ label: '0', value: 0 },{ label: '0', value: 0 },{ label: '0', value: 0 },{ label: '0', value: 0 }],
            
            width: 500,
            height: 300,

            marginLeft: 50,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 50,
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
            required: true,
            type:Array
        }
	},

    computed:{
        /**Mapeia os valores a serem lidos pelo gráfico */
        values(){
            return d3.map(this.data, d=>{
                return d.value
            });
        },
        xRange(){
            return [this.marginLeft, this.width - this.marginRight]
        },
        /**Valores do eixo x do gráfico */
        xScale(){
            return d3.scaleBand().domain(this.data.map(d => d.label)).range(this.xRange).padding(0.2);
        },
        yDomain(){
            return [0, this.maximum];
        },
        /**Valores do eixo x do gráfico */
        yScale(){
            return d3.scaleLinear().domain(this.yDomain).range(this.yRange).nice();
        },
        yRange(){
            return [this.height - this.marginBottom, this.marginTop]
        },
        min(){
            return this.info.minimum != undefined ? this.info.minimum : 0
        },
        maximum(){
            return this.info.maximum  != undefined ? this.info.maximum : 100
        },
    },

    methods:{

        /**Muda a opacidade da cor */
        addAlpha(color, opacity) {
            if(color.length > 7) return color //verifica se a cor já tem uma opacidade definida
            var opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
            return color + opacity.toString(16).toUpperCase();
        },
        /**Adapta a largura e altura do gráfico dependendo da altura e largura do card */
        async resizeMeasurer(){
            this.height = this.$el.offsetHeight * 0.8 
            this.width = this.$el.offsetWidth

            await this.refresh()
        },
        /**Constoi o gráfico */
        buildChart(){
            
            //Evita com que duplique o gráfico
            if(this.$el.children.length == 1) this.removeChart()

            const svg = d3.select(this.$el)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

            svg.selectAll('rect')
                .data(this.data)
                .enter()
                .append('rect')
                .attr('x', d => this.xScale(d.label))
                .attr('y', d => this.yScale(d.value))
                .attr('width', this.xScale.bandwidth())
                .attr('height', d => {
                    var height = this.yScale(0) - this.yScale(d.value)
                    height = height < 0 ? 0 : height
                    return height
                })
                .attr('fill', d => this.addAlpha(this.barColor(d.value), 0.33))
                .attr("stroke", d => this.barColor(d.value))

            const xAxis = d3.axisBottom(this.xScale);

            svg.append('g')
                .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
                .call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            const yAxis = d3.axisLeft(this.yScale).tickValues(d3.range(0, 100, 100/(this.height / 50)));

            svg.append('g')
                .attr('transform', `translate(${this.marginLeft}, 0)`)
                .call(yAxis);
        },

        async updateData() {
            this.data.shift() //Deleta o primeiro item da lista, o mais antigo.
            this.data.push({
                label: new Date().toLocaleString('pt-BR', { timezone: 'UTC' }).split(" ")[1], //Mostra apenas o horário
                value: this.value
            })
            await this.refresh();
        },

        /**Faz com que o gráfico seja remontado */
        async refresh(){
            try{
                this.removeChart()
                await this.$nextTick(); //espera um tick
                this.buildChart() // reconstroi o gráfico
            }catch{ //Caso o gráfico ainda não tenha sido construido
                this.buildChart() 
            }
        },
        
        /**Define a cor da barra a partir do valor recebido*/
        barColor(value){
            var color = '#3cd2a540' //cor caso algo falhe
            this.divisionsColorList.forEach(division => {
                //Pega o valor maximo e minimo da divisão baseado na porcentagem do valor máximo do display
                let start = this.maximum * (division.start / 100)
                let end = this.maximum * (division.end / 100)
                //Verifica se a cor da divisão atual é equivalente ao valor atual
                if((start <= value && value <= end) || value >= this.maximum){
                    color = division.color
                }
            })
            return color
        },

        removeChart(){
            const svg = this.$el.children[0]
            svg.remove() //deleta o gráfico do dom
        }
    },

    mounted() {
        this.buildChart()
        this.resizeMeasurer()
        this.interval = setInterval(async ()=>{
            await this.updateData()
        },5000)
    },

    beforeDestroy(){
        clearInterval(this.interval)
    }
}
</script>

<style>
</style>
