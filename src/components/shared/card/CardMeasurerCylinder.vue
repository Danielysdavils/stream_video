<template>
    <div class="grid w-100 h-100 d-flex justify-content-center align-items-center flex-column ">
        <div class="cylinder" ref="cylinder">
            <div class="fill" :style="[barColor, fillHeight]"></div>
        </div>
        <div class="info text-center">
            <h4>{{value}} {{unit}}</h4>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cylinderHeight: 20
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
        unit(){
            return this.info.unit ? this.info.unit : 'unidade'
        },

		/**Ajusta a altura do 'preenchimento' do cilindro */
        fillHeight(){
            var height = (this.cylinderHeight * this.value) /this.info.maximum //faz regra de três considerando que a altura do cilindro é igual o valor máximo
            height = this.value > this.info.maximum ? this.cylinderHeight : height // Não deixa o preenchimento ser maior que a altura do cilindro

            return {'--fill-height': `${height}px`}
        },

		/**Gera gradiente do cilindro */
        barColor(){
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
                "--barColor": gradient == "" ? "yellow" : `linear-gradient(0deg ${gradient})`
            }
		},
    },
    methods:{
        resizeMeasurer(){
			// Verifica se existe o elemento do cilindro criado
            if(this.$refs.cylinder) this.cylinderHeight = this.$refs.cylinder.offsetHeight
        }
    },
    mounted(){
        setTimeout(()=>{
            this.resizeMeasurer()
        }, 1000)
    }

}
</script>

<style scoped>
.grid{
    gap: 1rem
}
.cylinder {
	position: relative;
	overflow: hidden;
	margin: 0 auto;
	width: 25%;
	height: 80%;
	border-radius: 50px/25px;
	background-color: rgba(160, 160, 160, 0.5);
}

.cylinder:before {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 50px;
	border-radius: 50px/25px;
	background-color: rgba(160, 160, 160, 0.2);
	content: '';
}

.cylinder:after {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	border-radius: 50px/25px;
	background-color: rgba(160, 160, 160, 0.4);
	content: '';
}

.fill {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: var(--fill-height);
	padding-top: 50px;
	border-radius: 50px/25px;
	background: var(--barColor);
    /* : 0.5; */
    opacity: 0.5;
	transition: 0.3s linear;
}

/* Parte de cima */
.fill:before {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 50px;
	border-radius: 50px/25px;
    /* 0.2 */
    opacity: 0.2;
	background-color: var(--topColor);
	content: '';
}

/* Parte de baixo */
.fill:after { 
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	border-radius: 50px/25px;
    /* 0.4 */
    opacity: 0.4;
	background-color: var(--bottomColor);
	content: '';
}

</style>