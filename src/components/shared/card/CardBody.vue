<template>
    <div class="w-100 h-100 d-flex cardBodyContainer" ref="body">
        <!-- Icones de Alarme, Histórico, Ação e Reação -->
        <div v-if="isIconsShowing" class="iconsContainer" >
            <b-icon v-if="hasAlarms" :id="alarmPopoverTargetId" :icon="alarmIcon" :title="$i18n.t('alarm')" class="alarmIcon" />
            <alarm-popover v-if="hasAlarms" :target="alarmPopoverTargetId" :alarmList="alarmList"/>

            <b-icon :icon="historyIcon" :title="$i18n.t('history')" @click="toggleHistory" />
            <b-icon-lightning :title="$i18n.t('action')"/>
            <b-iconstack :title="$i18n.t('reciveAction')">
                <b-icon-lightning-fill shift-h="3"   scale="0.75" stacked/>
                <b-icon-box         shift-v="-15" scale="1" stacked/>
            </b-iconstack >
        </div>

        <!-- Medidor -->
        <div v-if="!historyOpen" 
        v-th-resizeCard="onCardResize"
        class="w-100 h-100 d-flex justify-content-center align-items-center measurerContainer">

            <alarm-indicator v-if="isIndicatorsVisible" ref="alarm" :info="info" :alarms="alarmList"/>
            <component 
            ref="measurer"
            :value="computedValue"
            :info="info" 
            :is="type"
            :divisionsColorList="divisionsColorList"
            :fullscreen="fullscreen"
            :topic="topic"
            />
            
        </div>

        <!-- Histórico -->
        <div v-else class="w-100 d-flex flex-column align-items-center justify-content-center">
            <h5>{{$i18n.t('history')}} - <span>7 {{$i18n.t('days')}}</span></h5>
            <div class="historyDataContainer">
                <div class="d-flex"><b-icon-sort-up/><h6>{{$i18n.t('minimum')}}:</h6></div>
                <div class="d-flex"><b-icon-sort-down/><h6>{{$i18n.t('maximum')}}:</h6></div>
                <div class="d-flex"><b-icon-bell-fill/><h6>{{$i18n.t('events')}}:</h6></div>
                <div class="d-flex"><b-icon-align-center/><h6>{{$i18n.t('average')}}</h6></div>
                <div class="d-flex"><b-icon-stack/><h6>Acumulados:</h6></div>
            </div>
        </div>
    </div>
</template>

<script>

import Gauge                    from './CardMeasurerGauge.vue'
import Vertical                 from './CardMeasurerVertical.vue'
import DigitalOutput            from './CardMeasurerDigital.vue'
import Text                     from './CardMeasurerText.vue'
import Chart                    from './CardMeasurerChart.vue'
import Semaphore                from './CardMeasurerSemaphore.vue'
import Thermometer              from './CardMeasurerThermometer.vue'
import LinearGauge              from './CardMeasurerLinearGauge.vue'
import Cylinder                 from './CardMeasurerCylinder.vue'
import Table                    from './CardMeasurerTable.vue'
import Barchart                 from './CardMeasurerBarchart.vue' 
import DigitalInput            from './CardMeasurerDigitalInput.vue'

import AlarmPopover             from './CardAlarmPopover.vue'
import AlarmIndicator           from './CardAlarmIndicator.vue'

export default {
    data(){
        return{
            alarm: false,
            historyOpen:false, 
            alarmList: [],
        }
    },

    props:{
        value: {
            type: Number || String,
            required: false,
            default: 80,
        },
        info:{
            type: Object,
            required: true
        },
        inputValue:{
            required:false,
        },
        fullscreen: {
            required:false,
            default:false,
            type:Boolean
        },
        inGroup:{
            type:Boolean,
            required:true,
            default: false
        },
        topic:{
            type:String,
            required:false,
            default: ''
        },
        isIconsShowing:{
            type: Boolean,
            required:false,
            default: true
        }
    },

    components:{
        Gauge,
        Vertical,
        "text-measurer": Text,
        Chart,
        Semaphore,
        Cylinder,
        Barchart,
        "digital": DigitalOutput, 
        'table-measurer': Table,
        Thermometer,
        LinearGauge,
        DigitalOutput,
        DigitalInput,
        AlarmIndicator,
        AlarmPopover,

    },

    computed:{
        min(){
			return this.info.minimum != undefined ? this.info.minimum : 0
		},
		max(){
			return this.info.maximum  != undefined ? this.info.maximum : 100
		},
        hasAlarms(){
            return this.alarmList.length >= 1
        },
        alarmIcon(){
            return this.alarm ? "bell-fill" : "bell"
        },
        historyIcon(){
            return this.historyOpen ? "clock-fill" : "clock-history"
        },
        
        alarmPopoverTargetId(){
            return "AlarmPopover-" + this.info.id
        },

        /** Verifica se o display tem um medidor associado a ele, caso contrário o selecionado será o gauge
         * Um display não tem nenhum medidor associado a ele quando ele ainda não foi criado.
         * Alem disso para os medidores de texto e tabela adiciona o sufixo '-measurer' para o navegador não se confundir
         * com os elementos padrão do HTML*/
        type(){
            const changeNameMeasurers = ["text", "table"] //Medidores que precisam ter seu nome modificado 
            if(this.info.name == undefined) return "gauge" // Caso nenhum medidor seja associado ao display, o medidor padrão a ser exibido será um gauge
            else if(changeNameMeasurers.includes(this.info.name)) return `${this.info.name}-measurer` //Adiciona sufixo
            return this.info.name // retorna o tipo do medidor
        },
        /** Função para padronizar as divisões em 4 items: cor, começo, e texto fim*/
        divisionsColorList(){
            const showLinear = !this.info.isGradient
			if(this.info.divisions != null && this.info.divisions.length >= 1){ // Verifica se há divisões criadas
				if(showLinear){ //Exibe apenas a cor dentro do intervalo da divisão
                    var color
                    var text
                    try{
                        const division = this.info.divisions.find(division => division.start <= 100*this.computedValue/(this.max-this.min) && 100*this.computedValue/(this.max-this.min) <= division.end)
                        color = division.color
                        text = division.text
                    }catch{
                        color = 'yellow'
                        text = 'status'
                    }
                    return [{start: 0, end: 100, color, text}]
                }
                else{ // Cores exibidas em gradiente 
                    const divisionsList = []
                    this.info.divisions.forEach(division => {
                        divisionsList.push({ //Padroniza os items da divisão
                            start: division.start,
                            color: division.color,
                            end: division.end,
                            text: division.text
                        })
                    })
                    //Ordena de forma com que os os menores inicios de divisões estejam no inicio da lista
                    return this.orderList(divisionsList)
                }
			}else{
                //Se não ha divisoes criadas, retorna uma lista com divisões pré-determinadas, isso pode acontecer quando o usuário está criado o medidor 
				return [{start: 0, color: "red", end: 32},{start: 33, color: "yellow", end: 65},{start: 66, color: "green", end: 100}]
			}
		},
        /** Valida o valor pois ele pode ser lido um valor da telemetria ou simulado o valor na hora de criar um medidor */
        computedValue(){
            var value = 0
            try{
                value = this.inputValue ? parseFloat(this.inputValue) : (this.value * this.info.multiplier) + this.info.constant;
                value = value.toFixed(2)
            }catch{value = 0}
            return parseFloat(value)
        },
        /** Função que determina se os indicadores serão, ou não, exibidos. */
        isIndicatorsVisible(){
            //Indica quais são os tipos de medidores que não apresentarão indicadores de alarme
            const hideIndicatorsInMeasurers = ["digital", "digital-input", "text-measurer", "table-measurer", "semaphore", "digital-output"]
            
            /** Retorna True se não estiver na lista e verifica se o medidor está num grupo ,
             * não sendo exibido no processo de criação e edição do medidor 
            */
            return !hideIndicatorsInMeasurers.includes(this.type) && this.inGroup  
        }
    },

    methods:{
        toggleHistory(){
            this.historyOpen = !this.historyOpen
        },
        /*Posiciona e redimenciona os alarmes de acordo com a posição e tamanho do medidor */
        ajustAlarmPositionAndSize(width, height){
            //Primeiro verifica se o tipo de medidor possui indicadores de alarme e se não está exibindo o histórico
            if(this.isIndicatorsVisible && !this.historyOpen) this.$refs.alarm.updateEachAlarmPositionAndSize(width, height)
        },
        /**Função que ordena uma lista com base no menor inicio da divisão de cores*/
        orderList(list){
            // Mapeia o inicio das divsões e ordena ela por ordem crescente
            const itemStartOrder = list.map(i => i.start).sort() 
            const orderedList = [] //nova lista
            list.forEach(item => {
                //Pega a posição em que o inicio dessa divisão está localizado
                let index = itemStartOrder.indexOf(item.start)
                orderedList[index] = item //associa a divisão a posição correta
            })
            return orderedList
        },
        /*Função que captura os valores de altura e largura do card e passa para o medidor.
        Cada medidor tem sua forma de se redimencionar ao tamanho do card */
        onCardResize(width, height){
            // Ve se o elemento do medidor já foi criado 
            if(this.$refs.measurer){
                // A biblioteca vue-svg-gauge já o redimenciona sozinho, então não é necessário o redimencionar
                // O medidor só pode ser redimencionado quando estiver dentro de um grupo
                if(this.inGroup) this.$refs.measurer.resizeMeasurer(width, height) 
                this.ajustAlarmPositionAndSize(width, height) // ajusta as posições e dimensões do alarme junto com o medidor
            }
        },
        /**
         * Função que verifica se algum alarme está ativo
         */
        listenToAlarms(){
            this.listenToAlarmsInterval = setInterval(()=>{
                this.alarm = Alarm.GetVariableMapValue(this.topic)
                this.$emit("alarm", this.alarm)
            }, 5000)
        }
    },

    mounted(){
        this.alarmService = new this.$alarmService()
        
        this.alarmService
        .listByUserId(this.$session.get('logged_id'))
        .then(alarms => {
            alarms.forEach(alarm => {
                if(alarm.display.id == this.info.id && alarm.enable){
                    const alarmObject = {
                        alarmRef: `alarm${alarm.id}`,
                        alarmValue: alarm.highSetpoint,
                        alarmHigh: alarm.highSetpoint,
                        alarmLow: alarm.lowSetpoint,
                        alarmName: alarm.name,
                        alarmCondition: alarm.operator
                    }
                    MqttClient.sub_topics(`Alarm/${alarm.id}`)
                    this.alarmList.push(alarmObject)
                }
            })
        })
        this.listenToAlarms();

        // Espera os medidores carregarem
        setTimeout(()=>{
            this.ajustAlarmPositionAndSize()
        },100)

    },
    beforeDestroy(){
        clearInterval(this.listenToAlarmsInterval);
    },
    updated(){
        
        const measurerContainer = this.$refs.measurer
        //
        if(measurerContainer != undefined){
            // container envolvendo o medidor
            const measurer = measurerContainer.$el
            
            //Ajusta as dimenções do alarme quando o tipo de medidor muda ou exibe/oculta o histórico ou muda o tipo de medidor
            this.onCardResize(measurer.offsetWidth, measurer.offsetHeight)

            //Ajusta as posições do alarme quando o tipo de medidor mudaou exibe/oculta o histórico
            this.ajustAlarmPositionAndSize()
        }
    }
}
</script>

<style lang="scss" scoped>
    .cardBodyContainer{
        gap: 0.5rem;
        height: 100% !important;
        min-height: 12rem;
        min-width: 12rem;
        flex-direction: column-reverse;
        justify-content: center;
        .iconsContainer{
            padding: 1rem;
            height:auto;
            width:100%;
            display:flex;
            justify-content: space-around;
            align-items: center;
            gap: 1rem;
            svg:nth-child(4){
                transform: translateY(-0.55rem);
            }
        }
    }
    .historyDataContainer{
        font-size: 1.25rem !important; 
        div{
            gap: 0.75rem
        }
        svg{
            opacity: 1;
            margin-left: 0.25rem;
            color: #af7213;
        }
    }
    .measurerContainer{
        overflow: hidden;
    }
</style>

<style>
    .card-body{
        overflow-x: hidden;
    }
</style>