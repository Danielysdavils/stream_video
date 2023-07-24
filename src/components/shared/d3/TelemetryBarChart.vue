<template>
    <svg :id="chartId"/>
</template>

<script>
import * as d3 from "d3";

export default {
    data(){
        return{
            marginLeft: 50,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 50,
            svg: null,
            bars: null,
        }
    },
    props:{
        datesFilter: {
            type: Array,
            required:false,
            default: []
        },
        chartTitle:{
            type:String,
            required:false,
            default: 'chart'
        },
        chartData:{
            required:false,
            type:Array,
            default(props){
                var resp = props ? props : []
                return resp
            }
        },
        height:{
            type:Number,
            required:false,
            default: 500
        },
        width:{
            type:Number,
            required:false,
            default: 600
        },
        keys:{
            required:false,
            type:Array
        },
        config:{
            required:true,
            type: Object
        }
    },
    computed:{
        chartId(){
            return `${this.chartTitle}-multipleBarChart`
        },
        divisions(){
            return d3.scaleBand()
                .domain(new Set(this.data.map(d => d.group)))
                .rangeRound([this.marginLeft, this.width - this.marginRight])
                .paddingInner(0.1);
        },
        measurersGroup(){
            return new Set(this.data.map(d => d.measurerName))
        },
        xScale(){
            return d3.scaleBand()
                .domain(this.measurersGroup)
                .rangeRound([0, this.divisions.bandwidth()])
                .padding(0.05);
        },
        yScale(){
            return d3.scaleLinear()
                .domain([0, d3.max(this.data, d => d.value)]).nice()
                .rangeRound([this.height - this.marginBottom, this.marginTop]);
        },
        barColor(){
            const colorList = this.keys.map(item => item[Object.keys(item)].color)
            return d3.scaleOrdinal().domain(this.measurersGroup).range(colorList).unknown("#ccc")
        },
        showBar(){
            return (key) => {
                for (let i = 0; i < this.keys.length; i++) {
                    if (key in this.keys[i]) {
                        return this.keys[i][key].show ? 'initial' : 'none';
                    }
                }
            }
        }
    },
    methods:{
        buildChart(){
            this.svg = d3.select(`#${this.chartId}`)
                .attr("height", this.height)
                .attr("width", this.width)
                .attr("viewBox", [0, 0, this.width, this.height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            
            const xAxis = d3.axisBottom(this.divisions).tickSizeOuter(0)
            this.svg.append("g")
                .attr("class", 'x-axis')
                .attr("transform", `translate(0,${this.height - this.marginBottom})`)
                .call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "center")
                .attr("dx", "-.0em")
                .attr("dy", ".5em")
                .attr("transform", "rotate(-0)")
                .call(g => g.selectAll(".domain").remove());
            
        
            const yAxis = d3.axisLeft(this.yScale).ticks(null, "s")
            this.svg.append("g")
                .attr('class', 'y-axis')
                .attr("transform", `translate(${this.marginLeft},0)`)
                .call(yAxis)
                .call(g => g.selectAll(".domain").remove());

            this.bars = this.generateBars()
        },
        generateBars(){
            return this.svg.append("g")
                .attr('class', 'bar')
                .selectAll()
                .data(d3.group(this.data, d => d.group))
                .join("g")
                .attr('class', 'bar_group')
                .attr("transform", ([division]) => `translate(${this.divisions(division)},0)`)
                .selectAll()
                .data(([, d]) => d)
                .join("rect")
                    .attr("x", d => this.xScale(d.measurerName))
                    .attr("y", d => this.yScale(d.value))
                    .attr("width", this.xScale.bandwidth())
                    .attr("height", d => this.yScale(0) - this.yScale(d.value))
                    .attr("fill", d => this.barColor(d.measurerName))
                    .style("display", d => this.showBar(d.measurerName))
        },
        generateIntervals(dates) {
            var multiply = {
                "sec": 1,
                "min": 60,
                "hour": 60 * 60,
                "day": 60 * 60 * 24,
                "month": 60 * 60 * 24 * 30,
                "year": 60 * 60 * 24 * 30 * 12
            }
            var interval = this.config.numOfIntervals * multiply[this.config.interval]
            const startDate = dates[0];
            const endDate = dates[dates.length - 1];
            const intervals = [];
            const start = new Date(startDate);
            const end = new Date(endDate);
            intervals.push(start.toISOString());

            while (start < end) {
                start.setSeconds(start.getSeconds() + interval);
                if (start < end) {
                intervals.push(start.toISOString());
                }
            }
            intervals.push(endDate);

            return intervals;
        },
        addGroupToObjects(data, intervals) {
            const modifiedData = JSON.parse(JSON.stringify(data));

            for (let i = 0; i < modifiedData.length; i++) {
                const item = modifiedData[i];
                for (let j = 0; j < intervals.length - 1; j++) {
                    const intervalStart = new Date(intervals[j]);
                    const intervalEnd = new Date(intervals[j + 1]);
                    const dateTime = new Date(item.dateTime);

                    if (dateTime >= intervalStart && dateTime <= intervalEnd) {
                        item.group = this.formatGroup(intervalStart, intervalEnd)
                        break;
                    }
                }
            }
            return modifiedData;
        },
        formatGroup(intervalStart, intervalEnd) {
            const sameDay = intervalStart.toDateString() === intervalEnd.toDateString();
            const hasDifferentYear = intervalStart.getFullYear() !== intervalEnd.getFullYear();

            if (sameDay && !hasDifferentYear) {
                return `${this.formatDate(intervalStart)} ${this.formatTime(intervalStart)} ~ ${this.formatTime(intervalEnd)}`;
            } else if (sameDay && hasDifferentYear) {
                return `${this.formatDate(intervalStart)} ${this.formatTime(intervalStart)} ~ ${this.formatDate(intervalEnd)} ${this.formatTime(intervalEnd)}`;
            } else {
                return `${this.formatTime(intervalStart)} ~ ${this.formatTime(intervalEnd)}`;
            }
        },

            // Helper function to format the date as dd/mm/yyyy
        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },

            // Helper function to format the time as hh:mm:ss
        formatTime(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        },
        updateMeasurersValues() {
            const groups = {};
            const intervals = this.generateIntervals(this.datesFilter)
            const data = this.addGroupToObjects(this.chartData, intervals)

            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const { group, measurerName, value } = item;

                const key = `${group}_${measurerName}`;

                if (!groups[key]) {
                    groups[key] = {
                        ...item,
                        value: [value],
                    };
                } else {
                    groups[key].value.push(value);
                }
            }

            const result = [];

            for (const key in groups) {
                const group = groups[key];
                const sum = group.value.reduce((acc, curr) => acc + curr, 0);
                const average = sum / group.value.length;
                group.value = this.config.isSum ? sum : average
                result.push(group);
            }

            return result;
        },
        updateChart() {
            this.yScale.domain([0, d3.max(this.data, d => d.value)])
            this.divisions.domain(new Set(this.data.map(d => d.group)))
            this.xScale.domain(new Set(this.data.map(d => d.measurerName)))
            this.xScale.rangeRound([0, this.divisions.bandwidth()])

            const yAxis = d3.axisLeft(this.yScale).ticks(null, "s")
            const xAxis = d3.axisBottom(this.divisions).tickSizeOuter(0)

            this.svg.select(".y-axis")
                    .transition().duration(200).ease(d3.easeCircle)  
                    .call(yAxis);  

            this.svg.select(".x-axis")
                    .transition().duration(200).ease(d3.easeCircle)  
                    .call(xAxis);
                    
            this.svg.selectAll(".bar").remove();

            this.bars = this.generateBars()
        },
    },
    mounted(){
        this.data = this.updateMeasurersValues()
        this.buildChart()
    },
    watch:{
        config:{
            deep:true,
            handler(){
                this.data = this.updateMeasurersValues()
                this.updateChart()
            }
        },
        keys:{
            deep:true,
            handler(){
                this.bars.transition()
                    .ease(d3.easeLinear)
                    .duration(1000)
                    .style("fill", d => this.barColor(d.measurerName))
                    .style("display", d => this.showBar(d.measurerName))
            }
        }
    }
}
</script>

<style>

</style>
