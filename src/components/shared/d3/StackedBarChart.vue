<template>
  <div v-if="printGraphicData()">
    <div class="btnFilterArea text-white">
      <b-button pill variant="info" v-on:click="updateLayout('stacked')">
        <b-icon icon="view-stacked" shift-h="-5"></b-icon>  
        {{$i18n.t('stacked')}} 
      </b-button>
      <b-button pill variant="info" v-on:click="updateLayout('grouped')">
        <b-iconstack>    
          <b-icon stacked icon="columns" shift-h="-5"></b-icon>    
        </b-iconstack>
        {{$i18n.t('grouped')}} 
      </b-button>
      <b-button pill variant="info" v-on:click="printGraphicData()">
        <b-iconstack>
          <b-icon stacked icon="arrow-clockwise" shift-h="-5"></b-icon>  
        </b-iconstack>
        {{$i18n.t('refresh')}} 
      </b-button>
    </div>

    <div id="tooltip_stacked" class="tooltip" style="opacity:0"></div>

    <svg :id="`barSvg_${name}`" class="svg" :viewBox="viewBox">
      <g :id="`gData_${name}`"></g>
      <g :id="`yAxis_${name}`" :transform="`translate(${this.margin.left},0)`">
        <text :x="-this.margin.left" y="15" text-anchor="start" fill="currentColor"></text>
      </g>
      <g :id="`xAxis_${name}`" :transform="`translate(0,${this.height - this.margin.bottom})`"/>
    </svg>

  </div>
</template>


<script>
import * as d3 from "d3";

export default {
  props: {
    name:{
      type: String,
      default: "stackedBarChart",
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    graphicData: {
        type: Array,
    },
    numberOfElements: {
      type: Number,
      default: 60,
    },
    width: {
        type: Number,
        default: 800,
    },
    height: {
        type: Number,
        default:400,
    },
    yLegend: {
        type: String,
        default: "",
    },
    color: {
        type: Array,
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
    },
    dates: {
      type: Array,
    }
  },

  data() {
    return {
      margin: {top: 20, right: 0, bottom: 40, left: 40},
      layout: '',
      refresh: true,
      groupBarCounter: 0,
      filter: "",
      prevent: false,
      prevStartDateTime: [],
      prevEndDateTime: [],    
      x: [],
      y: []
    };
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
    
    columns() {
      return this.filteredData.length;
    },

    points() {
      return this.filteredDates;
    },

    viewBox() {
        return `0 0 ${this.width} ${this.height}`;
    },
    
    yRange() {
        return [this.height - this.margin.bottom, this.margin.top];
    },
    
    xRange() {
        return  [this.margin.left, this.width - this.margin.right];
    },

    filteredData() {
      
      var filteredData = [[],[]];

      filteredData[0] = this.graphicData[0].filter((el, index) => {
        return new Date(this.dates[index]) >= new Date(this.computedStartDateTime) && new Date(this.dates[index]) <= new Date(this.computedEndDateTime);
      })

      filteredData[1] = this.graphicData[1].filter((el, index) => {
        return new Date(this.dates[index]) >= new Date(this.computedStartDateTime) && new Date(this.dates[index]) <= new Date(this.computedEndDateTime);
      })

      if(filteredData[0].length > 0)
        return this.getGraphicData(filteredData);

      return this.graphicData;      
    },

    filteredDates() {
      var filteredDates = [];
      filteredDates = this.dates.filter((el) => {
          return new Date(el) >= new Date(this.computedStartDateTime) && new Date(el) <= new Date(this.computedEndDateTime);
      })

      if(filteredDates.length > 0)
        return this.getDates(filteredDates);

      return filteredDates;
    },

  },

    
  methods: {    
    printGraphicData() {
      console.log(this.loaded);
      if(this.loaded) {
        if(this.graphicData.length > 0) {
          if(this.graphicData[0].length > 0) {
            this.barChart();
            return true;
          }
        }
      }

      return false;
    },

    getGraphicData(filteredData) {
      if(filteredData[0].length < this.computedNumberOfElements) {
        return filteredData;
      } else {
        var graphicData = [[] ,[]];

        filteredData[0].forEach((el, index, array) => {
          var value = array.splice(index + 1,1);
            if(value.length > 0) {
              graphicData[0].push(parseInt(el) + parseInt(value[0]));
            }
            else {
              graphicData[0].push(parseInt(el));
            }
        });

        filteredData[1].forEach((el, index,array) => {
          var value = array.splice(index + 1,1);
          if(value.length > 0) {
            graphicData[1].push(parseInt(el) + parseInt(value[0]));
          }
          else {
            graphicData[1].push(parseInt(el));
          }
        });


        return this.getGraphicData(graphicData);
      }    
    },

    getDates(filteredDates) {

      if(filteredDates.length < this.computedNumberOfElements) {
        return filteredDates;
      } else {
        filteredDates.forEach((el, index, array) => {
          array.splice(index +1, 1);
        });

        return this.getDates(filteredDates);
      }
    },

    barChart() {

      this.y = this.filteredData;
      const adjustedData = d3.stack().keys(d3.range(this.columns))(d3.transpose(this.y)).map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));
      this.yMax = d3.max(this.y, y => d3.max(y))
      this.y1Max = d3.max(adjustedData, y => d3.max(y, d => d[1]));  
  
      var yDomain = [0, this.y1Max];
      this.yScale = d3.scaleLinear(yDomain, this.yRange);
      var yAxis = d3.axisLeft(this.yScale);

      this.xDomain = this.points;
      this.xDomain = new d3.InternSet(this.xDomain);
      this.xScale = d3.scaleBand(this.xDomain, this.xRange).padding(0.08);      
      var xAxis = d3.axisBottom(this.xScale).ticks(this.width).tickFormat(d3.timeFormat("%H:%M"));


      this.z = d3.scaleSequential(d3.interpolatePuBu)
        .domain([-0.5 * this.columns, 1.3 * this.columns]);

      var legendItems = ["Entrada", "Saída"];
      var legendColor = ["#C6CDE4", "#589EC8"];

      const svg = d3.select(`#gData_${this.name}`);

      this.rect = svg.selectAll("g")
        .data(adjustedData)
        .join("g")

        .attr("fill", (d, i) => this.z(i))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", (d, i) => this.xScale(this.points[i]))
        .attr("id", (d, i) => `bar_${i}_${this.name}`)
        .on("mouseover", (event, i, d) => this.mouseover(event, i, d))
        .on("mouseout", (event, i, d) => this.mouseout(event, i, d))
        .on("click", (event, i) => this.click(event, i))
        .attr("y", this.height - this.margin.bottom)
        .attr("width", this.xScale.bandwidth()/2)
        .attr("height", 0)


        var legend = d3.select(`#gData_${this.name}`)
        .append("svg").attr("class", "legend")
        .attr("width", 1200)
        .attr("height", 50)
        .selectAll("g")
        .data(adjustedData)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(1" + Math.floor(i * 10) + ")"});

        legend.append("rect")
          .attr("width", 13)
          .attr("height", 13)
          .style("fill", function(d,i) { return legendColor[i] });

        legend.append("text")
          .data(legendItems)
            .attr("x", 18)
            .attr("y", 8)
            .attr("dy", ".35em")
            .style("fill", "white")
            .style("font-weight", 200)
            .style("font-size", 13)
            .text(function(d) { return d; });
            
      d3.select(`#yAxis_${this.name}`)
        .call(yAxis)
        .call(g => g.selectAll(".tick line")
          .attr("x2", this.width - this.margin.left - this.margin.right)
          .attr("stroke-opacity", 0.1));

          
      d3.select(`#xAxis_${this.name}`)
        .call(xAxis)
        .call(g => g.selectAll(".tick text")
                .attr("y", "2")
                .attr("x", "-20")
                .attr("transform", "rotate(-45)"));
    
      this.updateLayout('stacked');
    },

    mouseover(event, i, d) {
      d3.selectAll(`#${event.srcElement.id}`)
        .attr("opacity", "0.5")

      var tooltip = d3.select("#tooltip_stacked");
      var id = event.srcElement.id.split('_')[1];

      tooltip.transition()
        .style("opacity", 1);
        
      tooltip.html(`Entradas: ${this.y[0][id]}<br>Saidas: ${this.y[1][id]}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 15) + "px");
    },

    mouseout(event) {
        d3.selectAll(`#${event.srcElement.id}`)
          .join("g")
          .attr("opacity", "1")
          .attr("fill", (d, i) => this.z(i))

        var tooltip = d3.select("#tooltip_stacked");
        tooltip.transition()
            .style("opacity", 0);
    },

    click(event,){

      var delay = 200;
      this.prevent = false;

      if (event.detail === 1) {
        setTimeout(() => {
          if (!this.prevent) {
            var bars = this.filteredDates;
            const barId = (event.srcElement.id).split("_")[1];
            this.prevStartDateTime.push(this.startDateTime);
            this.prevEndDateTime.push(this.endDateTime);
            this.startDateTime = bars[parseInt(barId) - 3];
            this.endDateTime = bars[parseInt(barId) + 3];
          }
          this.prevent = false;
        }, delay);
      } 
      else if (event.detail === 2) {
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
    },

    transitionGrouped() {

      this.yScale.domain([0, this.yMax]);
      var yAxis = d3.axisLeft(this.yScale);
      this.groupBarCounter = 0;

      d3.select(`#yAxis_${this.name}`)
        .call(yAxis)
        .call(g => g.selectAll(".tick line")
          .attr("x2", this.width - this.margin.left - this.margin.right)
          .attr("stroke-opacity", 0.1));

      this.rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", (d, i) => this.xScale(this.points[i]) + (this.xScale.bandwidth()/ this.columns * d[2]) + this.getAdjust(i))
        .attr("width", (this.xScale.bandwidth() / this.columns)/2)
        .transition()
        .attr("y", d => this.yScale(d[1] - d[0]))
        .attr("height", d => this.yScale(0) - this.yScale(d[1] - d[0]));

    },

    getAdjust(i){
      
      var multiplier = (this.columns/2) - this.groupBarCounter;

      if(i == (this.points.length-1))
        this.groupBarCounter = this.groupBarCounter + 1;

      return (multiplier)*((this.xScale.bandwidth() / this.columns)/2.3);
    },

  transitionStacked() {

    this.yScale.domain([0, this.y1Max]);
    var yAxis = d3.axisLeft(this.yScale);

    d3.select(`#yAxis_${this.name}`)
      .call(yAxis)
      .call(g => g.selectAll(".tick line")
        .attr("x2", this.width - this.margin.left - this.margin.right)
        .attr("stroke-opacity", 0.1));

    this.rect.transition()
      .duration(500)
      .delay((d, i) => i * 20)
      .attr("y", d => this.yScale(d[1]))
      .attr("height", d => this.yScale(d[0]) - this.yScale(d[1]))
      .transition()
      .attr("x", (d, i) => this.xScale(this.points[i]) +  this.xScale.bandwidth()/4)
      .attr("width", this.xScale.bandwidth()/2);

  },

    updateLayout(layout) {
      if (layout === "stacked") this.transitionStacked();
      else this.transitionGrouped();
    },
  },
  
  };
</script>

<style lang="scss" scoped>
.svg {
  max-width: 100%; 
  background: #343a408f;
  color: white;
  padding: 20px;
  margin: 3%;
  border-radius: 30px;
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


.btnFilterArea {
  margin-top: 2em;
  padding-right: 1em;
  justify-content: end;
  display: flex;

  @media(max-width: 650px) {
    flex-direction: column;
    margin: 2em 1em;
  }
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

@media(max-width: 450px) {
  .svg, .btnFilterArea {
    display: none;
  }
  
}
</style>