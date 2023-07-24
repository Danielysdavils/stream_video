<template>
    <div class="">
        <h1>Missing Data</h1>
        <svg id="chartMissingData"></svg>
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    data(){
        return{
            data: [{time: "2-May-22", value: 8}, {time: "3-May-22", value: 10}, {time: "12-May-22", value: null}, {time: "13-May-22", value: 5}, {time: "14-May-22", value: 8}],
            width: 600,
            height: 500,

            marginLeft: 50,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 50,

            parseTime:  d3.timeParse("%d-%b-%y")
        }
    },
    computed:{
        X(){
            return d3.map(this.data, d =>{
                return this.parseTime(d.time)
            })
        },
        xRange(){
            return [this.marginLeft, this.width - this.marginRight]
        },
        xDomain(){
            return d3.extent(this.X);
        },
        xScale(){
            return d3.scaleUtc(this.xDomain, this.xRange)
        },

        Y(){
            return d3.map(this.data, d=>{
                return d.value
            });
        },
        yRange(){
            return [this.height - this.marginBottom, this.marginTop]
        },
        yDomain(){
            return [0, d3.max(this.Y)];
        },
        yScale(){
            return d3.scaleLinear(this.yDomain, this.yRange)
        },

        I(){
            return d3.range(this.X.length);
        },
        O(){
            return d3.map(this.data, d => d);
        },

        tooltipTitle(){
            const formatDate = this.xScale.tickFormat(null, "%b %-d, %Y");
            const formatValue = this.yScale.tickFormat(100);
            return i => `${formatDate(this.X[i])}\n${formatValue(this.Y[i])}`;
        }

    },
    methods:{
        buildChart(){

            //Verifica se existe data
            const D = this.data.map((i)=>{
                return i.value != null
            })
            
            

            //Preparando o gráfico
            const svg = d3.select("#chartMissingData").attr("width", this.width)
                                                    .attr("height", this.height)
                                                    .attr("viewBox", [0, 0, this.width, this.height])
                                                    .style("-webkit-tap-highlight-color", "transparent")
                                                    .style("overflow", "visible")
                                                    .on("pointerenter pointermove", this.pointerMove)
                                                    .on("pointerleave", this.poinerLeave)
                                                    .on("touchstart", event => event.preventDefault());

            // Eixos

            const xAxis = d3.axisBottom(this.xScale).ticks(this.width / 80).tickSizeOuter(0);
            const yAxis = d3.axisLeft(this.yScale).ticks(this.height / 40);

            //Linha
            const line = d3.line()
                .defined(i => D[i])
                .curve(d3.curveLinear)
                .x(i => this.xScale(this.X[i]))
                .y(i => this.yScale(this.Y[i]));


            //Plot
            svg.append("g")
                .attr("transform", `translate(0,${this.height - this.marginBottom})`)
                .call(xAxis);

            svg.append("g")
                .attr("transform", `translate(${this.marginLeft},0)`)
                .call(yAxis)
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").clone()
                    .attr("x2", this.width - this.marginLeft - this.marginRight)
                    .attr("stroke-opacity", 0.1))
                .call(g => g.append("text")
                    .attr("x", -this.marginLeft)
                    .attr("y", 10)
                    .attr("fill", "white")
                    .attr("text-anchor", "start")
                    .text("teste"));

            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", "#dc3545")
                .attr("stroke-width", 1.5)
                .attr("d", line(this.I.filter(i => D[i])));

            


            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 3)
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("stroke-opacity", 1)
                .attr("d", line(this.I));

            this.tooltip = svg.append("g")
                        .style("pointer-events","none")
        },

        pointerMove(e){

            const i = d3.bisectCenter(this.X, this.xScale.invert(d3.pointer(e)[0]));
            this.tooltip.style("display", null);
            this.tooltip.attr("transform", `translate(${this.xScale(this.X[i])},${this.yScale(this.Y[i])})`);

            const path = this.tooltip.selectAll("path")
            .data([,])
            .join("path")
                .attr("fill", "#29333d")
                .attr("stroke", "#495057");

            const text = this.tooltip.selectAll("text")
            .data([,])
            .join("text")
            .call(text => text
                .selectAll("tspan")
                    .data(`${this.tooltipTitle(i)}`.split(/\n/))
                    .join("tspan")
                    .attr("x", 0)
                    .attr("y", (_, i) => `${i * 1.1}em`)
                    .attr("font-weight", (_, i) => i ? null : "bold")
                    .attr("fill", "white")
                    .text(d => d));

            const {x, y, width: w, height: h} = text.node().getBBox();
            text.attr("transform", `translate(${-w / 2},${15 - y})`);
            path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
        },
        poinerLeave(){
            this.tooltip.style("display", "none");
        }
    },
    mounted(){
        this.buildChart();
    }
}
</script>

<style>

</style>