<template>
    <div class="w-100">    
        <div class="linearGaugeGrid mt-2" :style="gridLayout" ref="grid">
            <div class="itemWrapper" v-for="item in divisionsColorList" :key="item.color">
                <h6>{{getStart(item)}}</h6>
                <div class="item" :style="{'--color': item.color}"></div>
            </div>
        </div>
        <!-- Tooltip que mostra o valor -->
        <div class="progress" ref="progress" :data-width="value"></div>
        <!-- Barrinha que fica em cima do linear gauge -->
        <div class="linearGaugeProgressIndicator" ref="linearGaugeProgressIndicator"></div>
    </div>
</template>

<script>
export default {

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
            type:Array,
            required:true
        }
	},

    computed:{
        /** Função que define a largura de cada coluna da divisão */
        gridLayout(){
            var result = ''
            const lista = this.divisionsColorList
            lista.forEach(item => {
                result += `${item.end - item.start}% `} //Faz a subtração para descobrir a largura da divisão
            )
            return {'--grid-layout' : result}
        },

		max(){
			return this.info.maximum  != undefined ? this.info.maximum : 100
		},
    },

    methods:{
        /*Função que faz com que o tooltip que mostra o valor no linear gauge na posição correta*/
        resizeMeasurer(){
            //Verifica se elementos já carregaram
            if(this.$refs.grid && this.$refs.progress){

                const progress = this.$refs.progress // Pega a barra oculta que mostrará o valor através de um tooltp
                const gridLayoutWidth = this.$refs.grid.offsetWidth //Largura do linear gauge
    
                //Pega a posição em px em que o tooltip deve estar para ficar na posição correta
                var progressPercentage = ((gridLayoutWidth * this.value) /this.max) 
    
                //Não deixa a posição do tooltip ser alem da largura do gauge linear
                progressPercentage = progressPercentage <= gridLayoutWidth ? progressPercentage + 20 : gridLayoutWidth 
                
                progress.style.width = `${progressPercentage}px`
                this.$refs.linearGaugeProgressIndicator.style.left = progress.offsetWidth - 20 + "px" 
            }
        },

        /*Função que pega o valor de inicio da divisão */
        getStart(item){
            return parseInt((this.max * (item.start / 100)).toFixed(2))
        },

    },

    watch:{
        value(){
            //Faz com que o indicador mude sua posição quando o valor lido mudar 
            this.resizeMeasurer()
        }
    },

    mounted(){
        this.resizeMeasurer();
    }
}
</script>

<style lang="scss" scoped>
.linearGaugeGrid{
    display: grid;
    grid-template-columns: var(--grid-layout);
    gap: 3px;
    min-width: 100%;
}
.progress{
    height: 10%;
    width: 0;
    background-color: transparent;
    border-radius: 0;
    display: flex;
    justify-content: flex-end;
    &, &:before, &:after{
        position: absolute;
    }
    &:before{
        content: attr(data-width);
        background: rgba(255, 255, 255, 0.7);
        color: black;
        width: auto;
        z-index: 2;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 1em;
        line-height: 1;
        transform: translateY(50%);
    } 
    &:after {
        content: "";
        border-top: 1.31em solid transparent;
        border-bottom: 1.3em solid transparent;
        border-right: 0.6em solid rgba(255, 255, 255, 0.7);
        transform: translate(-14.5px, -7.5px) rotate(90deg);
	}
}

.itemWrapper{
    h6{
        position: relative;
        left: -15px;
        white-space: nowrap;
        overflow: hidden;
    }
    .item{
        height: 20px;
        width: 100%;
        background: red;
        background-color: var(--color);
        background-image: linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 0.5%, rgba(0,0,0,0) 0.5%, rgba(0,0,0,0) 25.5%, rgba(0,0,0,0.25) 25.5%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 50.5%, rgba(0,0,0,0.25) 50.5%, rgba(0,0,0,0.25) 51%, rgba(0,0,0,0) 51%, rgba(0,0,0,0) 75.5%, rgba(0,0,0,0.25) 75.5%, rgba(0,0,0,0.25) 76%, rgba(0,0,0,0) 76%);
        background-size: 50%;
    }
}
.linearGaugeProgressIndicator{
    width: 4px;
    height: 20px;
    background: #b6c4d2ba;
    position: relative;
    top: -20px;
    max-width: 100%;
}
</style>