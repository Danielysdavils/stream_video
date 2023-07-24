<template>
    <svg :id="chartId"></svg>
</template>

<script>
import * as d3 from "d3";
const d3ToPng = require('d3-svg-to-png')
export default {
    data(){
        return{
            width : 640,
            height : 400, 
            innerRadius : 0,
            data: []
        }
    },
    props:{
        chartTitle:{
            type:String,
            required:true,
        },
        chartData:{
            type:Array,
            required:true
        }
    },
    computed:{
        chartId(){
            return `${this.chartTitle}-pieChart`
        },
        name(){
            return d3.map(this.data, i=>{
                return i.name
            })
        },
        value(){
            return d3.map(this.data, i=> {
                return i.value
            })
        },
        index(){
            return d3.range(this.name.length).filter(i => !isNaN(this.value[i]));
        },
        title(){
            const formatValue = d3.format(",");
            return i => `${this.name[i]}\n${formatValue(this.value[i])}`;
        },
        stroke(){
            return this.innerRadius > 0 ? "none" : "white"
        },
        outerRadius(){
            return Math.min(this.width, this.height) / 2
        },
        labelRadius(){
            return (this.innerRadius * 0.2 + this.outerRadius * 0.8)
        },
        padAngle(){
            return this.stroke === "none" ? 1 / this.outerRadius : 0
        }
    },
    methods:{
        buildPieChart(){
            const svg = d3.select(`#${this.chartId}`)
                        .attr("height", this.height)
                        .attr("width", this.width)
                        .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
                        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
            
            const names = new d3.InternSet(this.name)
            const colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
            
            colors.forEach((c, i)=>{
                colors[i] = c.replace(')', ', 0.5)').replace('rgb','rgba')
            })


            const color = d3.scaleOrdinal(names, colors);

            const arcs = d3.pie().padAngle(this.padAngle).sort(null).value(i => this.value[i])(this.index)
            const arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius)
            const arcLabel = d3.arc().innerRadius(this.labelRadius).outerRadius(this.labelRadius)

            this.plotChart(svg, color, arcs, arc, arcLabel)
            
        },

        plotChart(svg, color, arcs, arc, arcLabel){
            svg.append("g")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .attr("stroke-linejoin", "round")
                .selectAll("path")
                .data(arcs)
                .join("path")
                    .attr("fill", d=>color(this.name[d.data]))
                    .attr("d", arc)
                .append("title")
                    .text(d=>this.title(d.data))

            svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
            .selectAll("tspan")
            .data(d=>{
                const lines = `${this.title(d.data)}`.split(/\n/)
                return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.splice(0,1)
            })
            .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .attr("fill", "white")
                .text(d=>d);
        },
        downloadChartImage(name=""){
            d3ToPng(`#${this.chartId}`, `PieChart-${name}`)
        },
        async filterData(){
            const dataArray = []

            var variableNames = this.chartData.map(item => item.name)
            variableNames = variableNames.filter((item,index) => variableNames.indexOf(item) === index)
            var variableObjects = variableNames.map(item => {
                return {
                    name: item,
                    value: 0
                }
            }).filter(i => i != undefined)


            console.log(variableNames)
            console.log(variableObjects)

            this.chartData.forEach(el => {
                // let pos = variableNames.indexOf(el.name)
                // variableObjects[pos].value += el.value
                // console.log(variableObjects)

                let dataObj = {}
                let {name, value} = el

                dataObj.name = name
                dataObj.value = value

                dataArray.push(dataObj)
            })
            return dataArray
        }
    },
    async mounted(){
        this.data = await this.filterData()

        // console.log(this.data)
        this.buildPieChart();
    }

}
</script>

<style>

</style>