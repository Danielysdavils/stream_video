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
        isDigital:{
            required: false,
            type: Boolean
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
        }
    },

    computed:{
        chartId(){
            return `${this.chartTitle}-multipleLineChart`
        },
        
        dates(){
            return d3.map(this.data, d=>{
                return d.time;
            })
        },

        values(){
            return d3.map(this.data, d=>{
                return d.value;
            })
        },

        oValues(){
            return d3.map(this.data, d=> d)
        },

        definedValues(){
            return this.data.map((i)=>{
                return i.value != null
            })
        },

        xDomain(){
            var dates = d3.map(this.datesFilter, d=>{
                return d;
            })
            return [dates[0], dates[dates.length -1]]
        },

        xRange(){
            return [this.marginLeft, this.width - this.marginRight]
        },

        xScale(){
            return d3.scaleUtc(this.xDomain, this.xRange)
        },

        yDomain(){
            return [0, d3.max(this.values, d=> typeof d === "string" ? +d : d)]
        },

        yRange(){
            return [this.height - this.marginBottom, this.marginTop]
        },

        yScale(){
            return d3.scaleLinear(this.yDomain, this.yRange)
        },

        zDomain(){
            return new d3.InternSet(this.zValues)
        },

        index(){
            return d3.range(this.dates.length).filter(i=>this.zDomain.has(this.zValues[i]))
        },

        title(){
            var titles = []
            this.data.forEach(el=>{
                titles.push(`${el.measurerName} (${el.division})`)    
            })
            return titles
        },

        zValues(){
            return this.title
        },

        tooltipTitle(){
            const formatDate = this.xScale.tickFormat(null, "%b %-d, %Y");
            const formatValue = this.yScale.tickFormat(100);
            return i => `${formatDate(this.dates[i])}\n${formatValue(this.values[i])}`;
        }
    },

    methods:{

        buildChart(){
            const xAxis = d3.axisBottom(this.xScale).ticks(this.width / 80);
                         // .tickSizeInner(-this.height + this.marginBottom + 20);
            const yAxis = d3.axisLeft(this.yScale).ticks(this.height  / 60);

            const line = d3.line()
                            .defined(i => this.definedValues[i])
                            .curve(d3.curveLinear)
                            .x(i => {
                                return this.xScale(this.dates[i])
                            })
                            .y(i => this.yScale(this.values[i]))
            
            //SVG
            this.svg = d3.select(`#${this.chartId}`)
                        .attr("height", this.height)
                        .attr("width", this.width)
                        .attr("viewBox", [0, 0, this.width, this.height])
                        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

            
            //Eixos
            this.svg.append("g")
                .attr("transform", `translate(0, ${this.height - this.marginBottom})`)
                .attr("class", "x-axis")
                .call(xAxis)
                
            this.svg.append("g")
                .attr("transform", `translate(${this.marginLeft}, 0)`)
                .attr("class", "y-axis")
                .call(yAxis)
                .call(g=> g.selectAll(".tick line").clone().attr("x2", this.width - this.marginLeft - this.marginRight).attr("stroke-opacity", 0.1))
                .call(g => g.append("text")
                    .attr("x", -this.marginLeft)
                    .attr("y", 10)
                    .attr("fill", "#97a4aa")
                    .attr("text-anchor", "start")
                    .text("Valores"))

            if(this.data.length <= 1){
                this.svg.append("g")
                    .attr("transform", `translate(${this.width * 0.35}, ${this.height * 0.5})`)
                    .append("text")
                        .attr("font-size", '4rem')
                        .attr("fill", '#dc3545')
                        .text(this.$i18n.t('noDataMeasurer'))
            }

            else{
                this.svg.on("pointermove", this.pointermoved)
                        .on("pointerenter", this.pointerentered)
                        .on("pointerleave", this.pointerleft)
                        .on("touchstart", event => event.preventDefault());
                
                this.svg.append("defs").append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("x", this.marginLeft)
                    .attr("width", this.width - this.marginRight)
                    .attr("height", this.height);
                

                this.path = this.svg.append("g")
                            .attr("class", "path")
                            .attr("fill", "none")
                            .attr("stroke", null)
                            .attr("stroke-linejoin", "round")
                            .attr("stroke-width", 2)
                            .attr("clip-path", "url(#clip)")
                            .attr("stroke-opacity", 1)
                        .selectAll("path")
                        .data(d3.group(this.index, i => this.zValues[i]))
                        .join("path")
                            .attr('class', 'line')
                            .attr("stroke", e => {
                                return this.getKeyValue(e[0]).color
                            })
                            .attr("d", ([, I]) => line(I))
                            .style("display", ([z]) => {
                                var show = this.getKeyValue(z).show
                                return show ? "initial" : "none"
                            })
                
                this.dot = this.svg.append("g").attr("display", "none")
    
                this.dot.append("circle")
                    .attr("r", 2.5)
                    .attr("fill", "#3cd2a5");
    
                this.dot.append("text")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("stroke", "#3cd2a5")
                    .attr("text-anchor", "middle")
                    .attr("y", -8);

                this.svg.call(this.zoom);
            }
        },
        zoom(svg){
            var extent = [
                        [this.marginLeft, this.marginTop], 
                        [this.width - this.marginRight, this.height - this.marginTop]
                    ];

            var zooming = d3.zoom()
                .scaleExtent([1, 200])
                .translateExtent(extent)
                .extent(extent)
                .on("zoom", this.zoomed)
            svg.call(zooming);
        },
        zoomed(event) {
            const line = d3.line()
                            .defined(i => this.definedValues[i])
                            .curve(d3.curveLinear)
                            .x(i => this.xScale(this.dates[i]))
                            .y(i => this.yScale(this.values[i]))
			this.xScale.range([this.marginLeft, this.width - this.marginRight]
				.map(d => event.transform.applyX(d)));

			this.path.join("path").attr("d", ([, I]) => line(I))

			this.svg.select(".x-axis")
				.call(d3.axisBottom(this.xScale).tickSizeOuter(0));
		},

        getKeyValue(key){
            let regex = /\s*\([^)]+\)$/;
            let keyWithoutVariable = key.replace(regex, '');
            for (let i = 0; i < this.keys.length; i++) {
                if (keyWithoutVariable in this.keys[i]) {
                    return this.keys[i][keyWithoutVariable];
                }
            }
            return null; // Retorna null se a chave não for encontrada
        },

        pointermoved(event){
            // this.showTooltip(event);
            this.focusInHoverLine(event);
        },

        pointerentered(){
            // Deixa todas as linhas meio apagadas
            this.path.style("stroke", "#29333d"); 
            this.dot.attr("display", null);
        },
        
        pointerleft(){
            this.unfocusInHoverLine()
        },

        showTooltip(e){
            const [xm, ym] = d3.pointer(e);
            const i = d3.least(this.index, i => Math.hypot(this.xScale(this.dates[i]) - xm, this.yScale(this.values[i]) - ym)); 

            this.tooltip.style("display", null);
            this.tooltip.attr("transform", `translate(${this.xScale(this.dates[i])},${this.yScale(this.values[i])})`);
            
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

        focusInHoverLine(event){
            const [xm, ym] = d3.pointer(event);
            const i = d3.least(this.index, i => {return Math.hypot(this.xScale(this.dates[i]) - xm, this.yScale(this.values[i]) - ym)}); 
            //Deixa a linha em hover branca 
            this.path.style("stroke", ([z]) => {
                var color = this.getKeyValue(z).color
                var isLineVisible = this.getKeyValue(this.zValues[i]).show
                return this.zValues[i] === z || !isLineVisible ? color : "#29333d"
            }).filter(([z]) => this.zValues[i] === z).raise();
            var showDot = this.getKeyValue(this.title[i]).show ? 'initial' : 'none'
            this.dot.attr("display", showDot).select("text").text(this.values[i])
            this.dot.attr("transform", `translate(${this.xScale(this.dates[i])},${this.yScale(this.values[i])})`);
            this.svg.property("value", this.oValues[i]).dispatch("input", {bubbles: true});
        },

        unfocusInHoverLine(){
            this.path.style("stroke", ([z]) => {
                return this.getKeyValue(z).color
            })
            this.dot.attr("display", "none");
            this.svg.node().value = null;
            this.svg.dispatch("input", {bubbles: true});
        },

        filterData(){

            const dataArray = []
            this.chartData.forEach((el, index) => {

                if(this.isDigital && index != 0){
                    var thisTime = new Date(el.dateTime)
                    dataArray.push({
                        division: dataArray[index - 1].division,
                        time: new Date(thisTime.setSeconds(thisTime.getSeconds() - 0.1)),
                        value: el.value
                    })
                }

                let dataObj = {}
                let {name, dateTime, value, measurerName} = el
                dataObj.division = name;
                dataObj.measurerName = measurerName;
                dataObj.time = new Date(dateTime);
                dataObj.value = value
                dataArray.push(dataObj)
                



            })
            return dataArray

        },
    },

    watch:{
        keys:{
            deep: true,
            handler(){
                this.path.transition()
            .ease(d3.easeLinear)
            .duration(200).style("stroke", ([z]) => {
                    var color = this.getKeyValue(z).color
                    return color
                }).style("display", ([z]) => {
                    var show = this.getKeyValue(z).show
                    return show ? "initial" : "none"
                })
            }
        },
    },


    mounted(){
        this.data = this.filterData()
        this.buildChart()
    },
}

</script>
