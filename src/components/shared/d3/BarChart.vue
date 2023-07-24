<template>
    <div v-if="printGraphicData()">
        <div class="refreshButton text-white">
            <b-button pill variant="info" v-on:click="printGraphicData()">
                <b-iconstack>
                    <b-icon stacked icon="arrow-clockwise" shift-h="-5"></b-icon>  
                </b-iconstack>
                {{$i18n.t('refresh')}} 
            </b-button>
        </div>

        <div id="tooltip" class="tooltip" style="opacity:0"></div>

        <svg :id="`barSvg_${this.name}`" class="svg" :viewBox="viewBox" >
            <g :id="`yAxis_${this.name}`" :transform="`translate(${this.marginLeft},0)`">
                <text :x="-this.marginLeft" y="15" text-anchor="start" fill="currentColor">

                </text>
            </g>
            <g :id="`bars_${name}`"></g>
            <g :id="`xAxis_${name}`" :transform="`translate(0,${this.height - this.marginBottom})`"/>
        </svg>
    </div>
</template>

<script>

import * as d3 from "d3";

export default {
    props: {
        name: {
            type: String,
            default: "barChart",
        },
        loaded: {
          type: Boolean,
          default: false,
        },
        graphicData: {
            required: true,
            type: Array,
        },
        numberOfElements: {
          type: Number,
          default: 60,
        },
        width: {
            type: Number,
            default: 1000,
        },
        height: {
            type: Number,
            default:370,
        },
        yLegend: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "steelblue",
        },
        yFormat: {
            type: String,
            default: "%",
        },
        startDateTime: {
            type: String,
            default: '',
        },
        endDateTime: {
            type: String,
            default: '',
        }

    },
    data() {
        return {
            marginTop: 20, // the top margin, in pixels
            marginRight: 0, // the right margin, in pixels
            marginBottom: 40, // the bottom margin, in pixels
            marginLeft:40, // the left margin, in pixels
            xPadding: 0.1,
            filter: "",
            prevent: false,
            refresh: true,
            prevStartDateTime: [],
            prevEndDateTime: [],
            x: [],
            y: []
        }

    },


    computed: {

        computedStartDateTime() {
            return this.startDateTime;
        },

        computedEndDateTime() {
            return this.endDateTime;
        },

        computedNumberOfElements() {
          return this.numberOfElements;
        },

        viewBox() {
            return `0 0 ${this.width} ${this.height}`;
        },

        yLabel() {
            return this.yLegend;
        },

        yRange() {
            return [this.height - this.marginBottom, this.marginTop];
        },
        
        xRange() {
            return [this.marginLeft, this.width - this.marginRight];
        },

        
        filteredData() {
            console.log(this.graphicData);
            var filteredData = this.graphicData.filter((el) => {
                return new Date(el.key) >= new Date(this.computedStartDateTime) && new Date(el.key) <= new Date(this.computedEndDateTime);
            })

            return this.getGraphicData(filteredData);
        },


    },

    methods: {
        printGraphicData() {

            if(this.loaded) {
                if(this.graphicData.length > 0) {
                    this.barChart();
                    return true;
                }
            }

            return false;
        },

        barChart() {
            this.x = d => new Date(d.key);
            this.y = d => d.value;


            var X = d3.map(this.filteredData, this.x);
            var Y = d3.map(this.filteredData, this.y);

            var xDomain = X;
            var yDomain = [0, d3.max(Y)];
            xDomain = new d3.InternSet(xDomain);
            var I = d3.range(X.length).filter(i => xDomain.has(X[i]));

            var xScale = d3.scaleBand(xDomain, this.xRange).padding(this.xPadding);         
            var yScale = d3.scaleLinear(yDomain, this.yRange);
            var yAxis = d3.axisLeft(yScale).ticks(this.height / 40);
            var xAxis = d3.axisBottom(xScale).ticks(this.width).tickFormat(d3.timeFormat("%H:%M"));
    
            var title;
            if (title === undefined) {
                const formatValue = yScale.tickFormat(100, this.yFormat);
                title = i => `${X[i]}\n${formatValue(Y[i])}`;
            } else {
                const O = d3.map(this.filteredData, d => d);
                const T = title;
                title = i => T(O[i], i, this.filteredData);
            }

            var legendItem = ["Ocupação"];
            var legendColor = ["#4682b4"];

            const svg = d3.select(`#barSvg_${this.name}`);
            svg.call(g => g.select("#bars").remove());
            
            d3.select(`#yAxis_${this.name}`)
                .call(yAxis)
                .call(g => g.selectAll(".tick line")
                    .attr("x2", this.width - this.marginLeft - this.marginRight)
                    .attr("stroke-opacity", 0.1))

            d3.select(`#xAxis_${this.name}`)
                .call(xAxis)
                .call(g => g.selectAll(".tick text")
                    .attr("y", "2")
                    .attr("x", "-20")
                    .attr("transform", "rotate(-45)"))


            svg.append("g")
                .attr("id", "bars")
                .attr("fill", this.color)
                .selectAll("rect")
                .data(I)
                .join("rect")
                .attr("id", i => `bar_${i}_${this.name}`)
                .attr("x", i => xScale(X[i]) +  + xScale.bandwidth()/4)
                .attr("y", i => yScale(Y[i]))
                .attr("height", i => yScale(0) - yScale(Y[i]))
                .attr("width", xScale.bandwidth()/2)
                .attr("opacity", 0.9)
                .on("mouseover", (event, i) =>  this.mouseover(event, i))
                .on("mouseout", (event, i) => this.mouseout(event, i))
                .on("click", (event, i) => this.click(event, i))

            var legend = d3.select(`#barSvg_${this.name}`)
                .append("svg").attr("class", "legend")
                .attr("width", 300)
                .attr("height", 100)
                .selectAll("g")
                .data(I)
                .enter()
                .append("g")
                .attr("transform", "translate(20, 0)");

                legend.append("rect")
                .attr("width", 13)
                .attr("height", 13)
                .style("fill", legendColor);

                legend.append("text")
                .data(legendItem)
                    .attr("x", 22)
                    .attr("y", 7)
                    .attr("dy", ".35em")
                    .style("fill", "white")
                    .style("font-weight", 200)
                    .style("font-size", 15)
                    .text(function(d) { return d; });

            return this.refresh;

        },


        getGraphicData(filteredData) {

            if(filteredData.length < 60) {
                return filteredData;
            } else {
                var graphicData = [];

                filteredData.forEach((el, index, array) => {
                    var value = array.splice(index + 1,1);
                    if(value.length > 0) {
                        graphicData.push({key: new Date(el.key), value: parseInt(el.value) + parseInt(value[0].value)}) ;
                    }
                    else {
                        graphicData.push({key: new Date(el.key), value: parseInt(el.value)}) ;
                    }
                });

                return this.getGraphicData(graphicData);
            }    
        },

        mouseover(event, i) {
            d3.select(`#bar_${i}_${this.name}`)
            .attr("opacity", "0.5");



            var tooltip = d3.select("#tooltip");
            tooltip.transition()
                .style("opacity", 1);
            tooltip.html(d3.map(this.filteredData, this.y)[i])
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 15) + "px");
        },

        mouseout(event, i) {
            d3.select(`#bar_${i}_${this.name}`)
            .attr("opacity", "1");

            var tooltip = d3.select("#tooltip");
            tooltip.transition()
                .style("opacity", 0);

        },

        click(event,){       
            var delay = 200;
            this.prevent = false;

            if (event.detail === 1) {
                setTimeout(() => {
                if (!this.prevent) {
                    var bars = this.filteredData;
                    const barId = (event.srcElement.id).split("_")[1];
                    this.prevStartDateTime.push(this.startDateTime);
                    this.prevEndDateTime.push(this.endDateTime);
                    this.startDateTime = bars[parseInt(barId) - 3].key;
                    this.endDateTime = bars[parseInt(barId) + 3].key;
                }
                this.prevent = false;
            }, delay);

            } else if (event.detail === 2) {
                this.clearSelection();
                this.prevent = true;
                if(this.prevStartDateTime.length > 0) {
                    this.startDateTime = this.prevStartDateTime.pop();
                    this.endDateTime = this.prevEndDateTime.pop();
                }
   
            }
        },

        clearSelection() {
            if(document.selection && document.selection.empty) {
                document.selection.empty();
            } else if(window.getSelection) {
                var sel = window.getSelection();
                sel.removeAllRanges();
            }
        }

    }

}

</script>

<style lang="scss" scoped>

.svg {
    max-width: 100%; 
    background: #343a40;
    color: white;
    padding: 20px;
    margin: 3%;
    border-radius: 30px;

    @media(max-width: 450px) {
        display: none;
    }
}

.refreshButton {
    margin-top: 1em;
    padding: 0 1em;
    display: flex;
}

button {
  padding: 7px;
  margin: 7px;
  width: 100%;
}

.legend {
  position: absolute;
  left: 60px;
  top: 30px;
}

.tooltip {
    position: absolute;
    text-align: center;
    padding: .5rem;
    background: #FFFFFF;
    color: #313639;
    border: 1px solid #313639;
    border-radius: 8px;
    pointer-events: none;
    font-size: 1.3rem;
}

</style>