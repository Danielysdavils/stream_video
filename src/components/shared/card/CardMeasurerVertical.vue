<template>
	<div :style="[responsiveSizing, barColor, barHeight]" ref="container" class="h-100 d-flex justify-content-center align-items-center container">
		<div class="verticalContainer">
			<div class="verticalFill" ></div>
		</div>
		<div class="d-flex flex-column justify-content-between infoContainer">
			<p class="text-success">{{max}}</p>
			<div class="w-100">
				<h2>{{value}}</h2>
				<h6>{{unit}}</h6>
			</div>
			<p class="text-danger" style="position:relative; top:20px">{{min}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				valuesArray: [],
				ratio: 1,
				cardWidth: 100,
				barColorStatus: "red"
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
				type: Array,
				required:true
			}
		},

		computed:{
			responsiveSizing(){
				
				var barWidth = this.cardWidth * 0.12
				var labelsSize = this.cardWidth * 0.04
				var valueSize = this.cardWidth * 0.08
				if(this.ratio < 0.34){
					labelsSize = labelsSize /2.5
					barWidth = barWidth /2.5
					valueSize = valueSize /2.5
				}

				var verticalContainerHeight = this.fullscreen ? `${window.innerHeight / 100 * 70}px` : "80%"
				
				barWidth = this.fullscreen ? `${window.innerWidth / 100 * 10}` : barWidth
				labelsSize = this.fullscreen ? `${window.innerWidth / 100 * 2.5}` : labelsSize	
				valueSize = this.fullscreen ? `${window.innerWidth / 100 * 5}` : valueSize
				
				return {
					"--verticalContainerHeight": verticalContainerHeight,
					"--barWidth" : `${barWidth}px`,
					"--labelsSize" : `${labelsSize}px`,
					"--valueSize" : `${valueSize}px`,
				}
			},

			barHeight(){
				var min = this.info.minimum != undefined ? this.info.minimum : 0
				var max = this.info.maximum != undefined ? this.info.maximum : 100
				const percentage = 100 - ((100*this.value) / (max-min))

				return{"--barHeight" : `${percentage}%`}
			},
			
			unit(){
				return this.info.unit ? this.info.unit : 'unidade'
			},
			min(){
				return this.info.minimum != undefined ? this.info.minimum : 'min'
			},
			max(){
				return this.info.maximum  != undefined ? this.info.maximum : 'max'
			},
			barColor(){
				console.log(this.divisionsColorList)
				var gradient = ''
				this.divisionsColorList.forEach((item, index) => {
					var count = 0
					while(count <= 1){
						if(count) gradient += `${item.color} ${index != this.divisionsColorList.length - 1 ? item.end - 5 : item.end}% `
						else gradient += `, ${item.color} ${index > 0 ? item.start + 5 : item.start}%,`
						count++
					}
				})

				return {"--barColor": gradient == "" ? "yellow" : `linear-gradient(0deg ${gradient})`}
			},
		},
		methods:{
			resizeMeasurer(w, h){
				this.cardWidth = w
				this.ratio = h/w
				
			}
		},
		mounted(){
			this.cardWidth = this.$refs.container.offsetWidth * 0.5
		}
	}
</script>

<style scoped>
	.grid{
		display: grid;
		grid-template-columns: 70% 30%;
	}
	.container{
		gap: 1rem
	}
	.verticalContainer{
		height: var(--verticalContainerHeight);
		width: var(--barWidth);
		background: var(--barColor);
		/* border-radius: 12px; */

	}
	.verticalFill{
		height: var(--barHeight);
		max-height: 100%;
		width: 100%;
		background: gray;
		transition: height 0.5s ease;
		/* background: red; */
	}
	.infoContainer{
		height: var(--verticalContainerHeight);
	}
	h2{
		font-size: var(--valueSize);
	}
	h6{
		font-size: var(--labelsSize);
	}
	p{
		font-size: var(--labelsSize);
		opacity: 1;
	}
</style>