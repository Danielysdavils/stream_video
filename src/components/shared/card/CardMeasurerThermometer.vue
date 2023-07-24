<template>
    <div ref="container" class="wrapper w-100 h-100 d-flex flex-column" :style="[linearGradient, firstColor, tooltipPosTop, dimensions]">
        <div class="termometer">
            <div class="temperature" style="height: 100%" :data-value="tooltipValue">
			</div>
            <div class="heightWrapper" ref="heightWrapper" :data-value="tooltipValue"></div>
            <div class="graduations"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            height: 240,
			width: 25,
            heightWrapperHeight: 0,
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

		/**Gera o gradiente da barra que simboliza o valor lido */
        linearGradient(){
			var gradient = ""
            this.divisionsColorList.forEach((item, index) => {
				var count = 0
				while(count <= 1){
					if(count) gradient += `${item.color} ${index != this.divisionsColorList.length - 1 ? item.end - 5 : item.end}% `
					else gradient += `, ${item.color} ${index > 0 ? item.start + 5 : item.start}%,`
					count++
				}
			})

            return {
                '--linear-gradient' : gradient == "" ? "yellow" : `linear-gradient(0deg ${gradient})`
            }
        },

		/**define a cor da base do termometro */
        firstColor(){
            return {
                '--first-color' : this.value > 0 ? this.divisionsColorList[0].color : "#30333c"
            }
        },

		/**Faz com que o tooltip aponte para o topo da barra gradiente	 */
        tooltipPosTop(){
            return {
                '--tooltip-top' : `${this.heightWrapperHeight}px`
            }
        },
        unit(){
            return this.info.unit && this.info.unit != ''?  this.info.unit : this.$i18n.t("unit")
        },

        tooltipValue(){
            return `${this.value}${this.unit}`
        },

		dimensions(){
			var width = this.width * 0.25
			return {
				'--height': `${this.height}px`,
				'--width': `${width}px`,
				'--bulb' : `${width * 1.25}px`
			}
		}
    },

    methods:{
		/** Função que aumenta a altura do 'Wrapper' que serve para ocultar o gradiente acima do valor lido,
		fazendo com que apenas as cores das divisões menores ou iguais ao valor aparecam.
		Tambem faz com que o tooltip que indica o valor aponte para o local correto*/
        ajustGradientSizeAndTooltipPos(){
			var heightWrapper = this.$refs.heightWrapper //elemento do wrapper
			
			var value = (this.value * 100) /this.info.maximum // Calcula quanto a barra com coloração gradiente ocupa
			var barHeight = 100 - value; // Calcula quanto o Wrapper ocupa 
			barHeight = barHeight < 0 ? "0%" : `${barHeight}%`  
            heightWrapper.style.height = barHeight;

			//Espera a animação da barra se mexendo acabar para poder posicionar o tooltip na ponta do wrapper 
            setTimeout(() => {
                this.heightWrapperHeight = heightWrapper.offsetHeight
            }, 200);
        },
		
		resizeMeasurer(w,h){
			this.width = w
			this.height = h
			this.ajustGradientSizeAndTooltipPos();
		}
    },
    watch:{
		/**Quando houver uma mudança no valor lido, a barra se ajustará */
        value(){
            this.ajustGradientSizeAndTooltipPos();
        },
    },

    mounted(){
		setTimeout(()=>{
			this.resizeMeasurer(this.width, this.height)
		}, 100)
    }
}
</script>

<style lang="scss" scoped>

    $TM-mainTint: #3d3d44;
    $TM-backgroundColor: darken($TM-mainTint, 2%);
    $TM-borderSize: 9px;
    $TM-borderColor: darken($TM-mainTint, 8%);
    $TM-width: 25px;
    $TM-height: 240px;
    $TM-radius: 20px;
    $TM-graduationsStyle: 2px solid rgba(0, 0, 0, 0.5);

    // Tooltip
    $TM-tooltipColor: rgba(0, 0, 0, 0.7);
    $TM-tooltipSize: 1em;
    $TM-tooltipRadius: 5px;
    $TM-tooltipTopShift: 5px;
    $TM-tooltipVerticalPadding: 5px;
    $TM-tooltipHorizontalPadding: $TM-tooltipVerticalPadding * 2;
    $TM-tooltipLeftShift: 100%;
    $TM-tooltipArrowWidth: 1.5;
    $TM-tooltipArrowHeight: 2.2;

    @mixin border() { border: $TM-borderSize solid $TM-borderColor; }

    .wrapper{
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
		justify-content: center;
    }

    .termometer {
	width: 25%;
	background: $TM-backgroundColor;
	height: var(--height);
	position: relative;
	@include border;
	border-radius: $TM-radius;
	z-index: 1;
	// margin-bottom: var(--bulb);
	
	&:before, &:after {
		position: absolute;
		content: "";
		border-radius: 50%;
	}
	
	&:before {
		width: 100%;
		height: var(--bulb) / 2 + $TM-borderSize;
		bottom: $TM-borderSize;
		background: $TM-backgroundColor;
		z-index: -1;
	}

	
	.graduations {
		height: 59%;
		top: 20%;
		width: 50%;

		&, &:before {
			position: absolute;
			border-top: $TM-graduationsStyle;
			border-bottom: $TM-graduationsStyle;
		}
		
		&:before {
			content: "";
			height: 34%;
			width: 100%;
			top: 32%;
		}
	}

	.heightWrapper{
        // height: 20px;
        width: 100%;
		min-width: 3px;
        background: #33343c;
        position: absolute;
        border-radius: 10px 10px 0px 0px;
        transition: all 0.2s ease-in-out;
    }

	.temperature {
        height: 100%;
		bottom: 0;
		background: var(--linear-gradient);
		width: 100%;
		min-width: 3px;
		border-radius: 10px;
		background-size: 100% var(--height);
		transition: all 0.2s ease-in-out;
		
		&, &:before, &:after {
			position: absolute;
		}

		
		&:before {
			content: attr(data-value);
			background: $TM-tooltipColor;
			color: white;
            width: auto;
			z-index: 2;
			padding: $TM-tooltipVerticalPadding $TM-tooltipHorizontalPadding;
			border-radius: $TM-tooltipRadius;
			font-size: $TM-tooltipSize;
			line-height: 1;
			transform: translateY(50%);
			left: calc(#{$TM-tooltipLeftShift} + 1em / #{$TM-tooltipArrowWidth});
			top: calc(-1em + var(--tooltip-top) - #{$TM-tooltipVerticalPadding} * 2);
		}

		&:after{
			content: "";
			height: calc(10% + 9px);
			min-height: 3rem;
			width: calc((var(--width) * 1.25) + 9px);
			background: var(--first-color);
			min-width: 175%;
			border-radius: 100%;
			border: 9px solid #27282d;
			bottom: 0;
			z-index: -1;
			right: 50%;
			transform: translateY(1rem) translateX(50%);
		}
	}
}

</style>