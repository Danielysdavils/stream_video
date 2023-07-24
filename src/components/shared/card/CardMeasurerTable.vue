
<template>
    <div class="h-100 w-100 p-2" ref="container">
        <b-table striped hover :fields="visibleFields" :items="items" class=" measurerTable" ref="table" :tbody-tr-class="rowClass"></b-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fields: [
                {key: 'horario',   label: this.$i18n.t('time'),   visible: false},
                {key: 'valor',     label: this.$i18n.t('value'),     visible: true },
                {key: 'variacao',  label: this.$i18n.t('variation'),  visible: false},
            ],
            items: []
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
		}
    },

    methods:{
        rowClass(item, type){
            if (!item || type !== 'row') return
            if (item.status !== '') return item.status
        },
        resizeMeasurer(){
            this.ajustRows()
            this.ajustColumns()
        },
        ajustColumns(){
            var gridLayoutWidth = document.querySelector(".vue-grid-layout").offsetWidth
            var currentCardWidth = this.$parent.$refs.body.offsetWidth
            var defaultCardWidth = gridLayoutWidth / 6

            const cardProportion = Math.floor(currentCardWidth / defaultCardWidth ) + 1
            this.toggleColumns(cardProportion)
        },
        toggleColumns(number){
            this.fields[0].visible = number >= 2
            this.fields[2].visible = number >= 3
        },
        ajustRows(){
            try{
                this.containerHeight = this.$refs.container.offsetHeight
            }catch{}
        },
        updateValues(){
            var lastValue = 0
            this.updateTableValuesInterval = setInterval(()=>{
                let value = this.value
                let status = value > lastValue ? 'high' : value == lastValue ? '' : 'low'
                
                let newRow = { 
                    horario: new Date().toLocaleString('pt-BR', { timezone: 'UTC' }).split(" ")[1],
                    valor: `${value} ${this.info.unit}`, 
                    status:status, 
                    variacao: Math.abs(value - lastValue),
                    teste3: "3",
                    teste4: "4" 
                }

                this.items = [newRow].concat(this.items)
                lastValue = value
                this.ajustRows()
            },5000)
        }
    },
    computed:{
        visibleFields(){
            return this.fields.filter(field => field.visible)
        },
        visibleItems(){
            const lineQuant = Math.floor(this.containerHeight / 50)
            return this.items.filter((item, index) => index < lineQuant)
        },
    },
    mounted(){
        this.ajustColumns()
        this.ajustRows()
        this.updateValues() 

        //Mostra todas as colunas quando é aberto em tela cheia
        if(this.fullscreen) this.toggleColumns(4)
    },

    beforeDestroy(){
        clearInterval(this.updateTableValuesInterval)
    }
}
</script>

<style lang="scss">
    table.measurerTable{
        width: 100%;
        tbody > tr:nth-child(1) {
            font-weight: bolder;
            background-color: rgba(0, 0, 0, 0.565)
        }
    }
    table.measurerTable div, table.measurerTable td{
        text-align: center !important;
    }
    table.measurerTable td{
        border-left: 1px solid white;
        font-size: 1.25em;
    }
    table.measurerTable td:nth-child(1) {
        border-left: none
    }
    table.measurerTable tr{
        &.low{
            background-color: rgba(225, 65, 102, 0.0625) !important;
            & td{
                color: rgb(244, 66, 81);
            }
        }
        &.high{
            background: rgb(51, 172, 47, 0.0625) !important;
            & td{
                color: rgb(79, 248, 144);
            }
        }
    }
</style>