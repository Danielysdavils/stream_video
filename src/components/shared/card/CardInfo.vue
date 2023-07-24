<template>

    <div class="w-100 h-100">
        <div class="isOffIndicator" v-if="!isVariableActive && inGroup">
            <h1>{{$i18n.t('disabled')}}</h1>
        </div>
        <div class="bgColor animate__animated">
            <b-card 
            ref="card"
            class="card" 
            footer-tag="footer" 
            header-tag="header" >

                <!-- Cabeçalho -->
                <template #header>
                    <div id="cardHeader" class="w-100 d-flex justify-content-between cardHeader">
                        <div class="d-flex flex-column justify-content-between w-100">
                            <h4 class="w-100">{{name}}</h4>
                        </div>
                        <div class="w-50 d-flex justify-content-end" style="gap: 0.5rem; flex-wrap: wrap"  v-if="isIconsShowing && isVariableActive">
                            <b-icon-arrows-fullscreen @click="goMeasurerFullscreen"/>
                            <b-icon-eye-fill :id="popoverIdChangeMeasurer" :title="$i18n.t('changeMeasurer')"/>
                            <popover direction="bottom" :disabled="!inGroup" :selected="info.name" translate :title="$i18n.t('changeMeasurer')" :id="popoverIdChangeMeasurer" @changeMeasurer="changeMeasurer" :info="measurersList" optionText="text"/>
                        </div>
                    </div>
                </template>


                <!-- Corpo -->
                <card-body  @alarm="setAlarm" :isIconsShowing="isIconsShowing" :topic="topic" :inGroup="inGroup" :value="value" :inputValue="inputValue" :info="info"/>


                <!-- Rodapé  -->
                <template #footer>
                    <div class="d-flex justify-content-center w-100" style="gap: 1rem" v-if="isIconsShowing">
                        <b-icon-trash-fill      @click="deleteCard"  :title="$i18n.t('remove')"/>
                        <b-icon-pencil-fill     @click="openEditMeasurer" :title="$i18n.t('edit')"/>
                        <b-icon-collection      :id="popoverIdChangeGroup" :title="$i18n.t('changeGroup')"/>
                        <popover        direction="top" :disabled="!inGroup" :selected="groupId" :title="$i18n.t('changeGroup')" :id="popoverIdChangeGroup" @changeMeasurer="changeGroup" :info="dashboardGroups" optionText="name"/>
                    </div>
                </template>

                <info-modal :id="modalId" size="xl" :center="true" :fullscreen="true" ref="modal">
                    <template #header>
                        <div class="d-flex flex-column justify-content-between w-100">
                            <h4 class="w-100">{{name}}</h4>
                        </div>
                    </template>
                    
                    <template #body>
                        <card-body  @alarm="setAlarm" :topic="topic" :inGroup="inGroup" :value="value" :inputValue="inputValue" :info="info" fullscreen/>
                    </template>
                    
                </info-modal>

            </b-card>
        </div>
    </div>

</template>

<script>

import popover          from "./CardPopover.vue"
import CardBody         from "./CardBody.vue"

export default {
    components:{
        popover,
        CardBody,
    },
    
    props:{
        topic:{
            type: String,
            required: false,
            default: ""
        },
        info:{
            type: Object,
            required: true
        },
        color:{
            type: String,
            required: false,
            default: "#000000"
        },
        created:{
            type: Boolean,
            required: false,
            default: false
        },
        inGroup:{
            type: Boolean,
            required: false,
            default: false
        },
        inputValue:{
            type: undefined,
            required:false
        },
        measurerId:{
            type: Number,
            required:false,
            id: 0
        },
        dashboardId:{
            type: undefined,
            required: false,
            default: 0
        },
        groupId:{
            type:Number,
            required:false,
            default: 0
        },
        isIconsShowing:{
            type: Boolean,
            required:true
        }
    },

    data() {
        return {
            alarm: false,
            historyOpen: false,
            element: {},
            value: 0,
            measurersList : [
                {text: "gauge",value: 1,},
				{text: "digital-output",value: 2 },
				{text: "chart",value: 3},
				{text: "text",value: 4},
				{text: "semaphore",value: 5},
				{text: "vertical",value: 6},
                {text: "cylinder", value: 7},
                {text: "barchart", value: 8},
                {text: "table",    value: 9},
                {text: "thermometer" ,value: 10},
                {text: "linear-gauge", value: 11},
                {text: "digital-input", value: 12}
			],
            dashboardGroups: [],
            isVariableActive:true
        }
    },

    computed:{
        modalId(){
            return `modalFullscreen-${this.measurerId}`
        },
        name(){
            return this.info.cardName && this.info.cardName != ''?  this.info.cardName : this.$i18n.t("subtitlePlaceholderValue")
        },
        type(){
            return this.info.name == undefined ? "gauge" : this.info.name
        },
        unit(){
            return this.info.unit && this.info.unit != ''?  this.info.unit : this.$i18n.t("unit")
        },
        background() {
            return `${this.color}66`;
        },
        header() {
            return `${this.color}`;
        },
        createdStyle(){
            if(this.created){
                return {
                    '--max-Width': '30rem',
                }
            }else{
                return{
                    '--max-Width': 'none',
                }
            }
        },
        popoverIdChangeMeasurer(){
            const random = Math.random() * 34
            return `MeasurerPopover-${random.toString()}`
        },
        popoverIdChangeGroup(){
            const random = Math.random() * 34
            return `GroupPopover-${random.toString()}`
        },
        cardMaxHeight(){
            return {"--max-Height": this.inGroup ? "none" : "40rem"}
        },
    },
    methods:{

        activeAlarm(){
            this.$refs.card.classList.add('alarmActive')
            this.$el.querySelector('.animate__animated').classList.add("animate__headShake", 'animate__infinite')
            var audio = new Audio('../alarm2.mp3');
            audio.play();
        },
        removeAlarm(){
            this.$refs.card.classList.remove('alarmActive')
            this.$el.querySelector('.animate__animated').classList.remove("animate__headShake", 'animate__infinite')

        },
        
        setAlarm(isActive){
            this.alarm = isActive
        },

        deleteCard(){ //EXIBIR MODAL - chama a função de deletar, emite para DashboardGridLayout
            if(this.inGroup){
                this.$emit("deleteCard", {id: this.measurerId})
            }
        },
        updateDisplay(){
            this.displayService.update(this.info, this.$session.get("logged_id"))
        },  

        openEditMeasurer(){
            if(this.inGroup){
                this.$emit("editMeasurer", this.element)
                window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
                });
            }
        },

        changeMeasurer(measurer){
            this.info.name = measurer.text

            // this.updateDisplay()
        },
        changeGroup(group){
            this.$emit("changeGroup", group)
        },

        goMeasurerFullscreen(){
            // Somente quando inserido em um grupo será possivel deixar o medidor em fullscreen, bloqueando no processo de criação e edição de medidor 
            if(this.inGroup){
                this.$bvModal.show(this.modalId) //Abre o modal que tomará 100% da tela
                this.$refs.modal.fullscreenModal() // Ajusta os estilos do modal
            }
        },

        setIsVariableActive() {
            const now = new Date(); // Data no momento da chamada da função
            const variableLastDate = new Date(this.element.variable.dateTime) //Data da ultima atualização da variavel
            // calcula a difrença de tempo desde a ultima atualização e converte para minutos
            const msDiff = now - variableLastDate;
            const minDiff = msDiff / 60000;

            // retorna o booleano que indica se está ou não ativa
            this.isVariableActive = minDiff < 1

        }
    },

    mounted() {
        
        this.service = new this.$measurerService();
        this.displayService = new this.$displayService()
        this.dashboardService = new this.$dashboardService();

        if(this.measurerId){
            this.service.search(this.measurerId).then(response => {        
                this.element = response;
                this.setIsVariableActive()
            })

            this.dashboardService
            .search(this.dashboardId)
            .then((dashboard)=>{
                this.dashboardGroups= dashboard.groups
            })
        }
        const refreshRate = this.info.refreshRate * 1000
        this.value = Variable.GetVariableMapValue(this.topic);
        this.updateInterval = setInterval(()=>{
            if(this.topic != ""){
                this.value = Variable.GetVariableMapValue(this.topic);
            }
            else{
                this.value = 50
            }
        },refreshRate)
    },
    
    beforeDestroy(){
        clearInterval(this.updateInterval)
    },
    watch: {
        isIconsShowing(){
            const footer = this.$el.querySelector(".card-footer")
            if(this.isIconsShowing) footer.classList.remove('hideBorder')
            else footer.classList.add('hideBorder')
        },
        alarm(){
            if(this.alarm){
                this.activeAlarm()
            }else{
                this.removeAlarm()
            }
        }
    }

}
</script>

<style scoped lang="scss">

    .isOffIndicator{
        position: absolute;
        height: 100%;
        width: 100%;
        background: #000000b8;
        z-index: 10;
        display: flex;
        justify-content: center;
        cursor: not-allowed;
        align-items: center;
        backdrop-filter: blur(7px) saturate(172%);
    }
    .bgColor { 
        background-color: v-bind(background);
        width: 100%;
        height: 100%;
    }

    .card{
        max-height: var(--max-Height);
		height: 100% !important;
        width: 100%;
		border: 1px solid transparent;
        max-width: var(--max-Width);
		background:
				linear-gradient(to right, white 3px, transparent 3px) 0 0,
				linear-gradient(to right, white 3px, transparent 3px) 0 100%,
				linear-gradient(to left, white 3px, transparent 3px) 100% 0,
				linear-gradient(to left, white 3px, transparent 3px) 100% 100%,
				linear-gradient(to bottom, white 3px, transparent 3px) 0 0,
				linear-gradient(to bottom, white 3px, transparent 3px) 100% 0,
				linear-gradient(to top, white 3px, transparent 3px) 0 100%,
				linear-gradient(to top, white 3px, transparent 3px) 100% 100%;

			background-repeat: no-repeat;
			background-size: 20px 20px;
            background-color: #00000036;
            
        .card-header{
            padding: 0
        }
        .cardHeader{
            background-color: v-bind(header);
            padding: 12px 12px 0px
        }
        .card-body{
            min-height: 13rem;
            align-items: center;
            .body{
                display:grid;
                height: 100% !important;
                min-height: 12rem;
                min-width: 12rem;
            }
        }
        .hideBorder{
            border: none !important;
        }
		h4{
			font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
		}
		h6{
			font-size: 0.9rem ;
            white-space: nowrap;
            overflow: hidden;
		}
        p{
            white-space: nowrap;
            overflow: hidden;
        }
		header{
			margin-bottom: 0;
			padding-bottom: 0;
		}
		header, footer{
			border-color: rgb(255, 255, 255, 0.1);
		}
		svg{
            cursor: pointer !important;
			opacity: 0.5;
			&:hover{
				opacity: 1;
			}
		}
        &.alarmActive{
            outline: 5px solid red;
            outline-offset: -5px;
            animation: blinkAlarmBorder 0.75s ease-in-out alternate-reverse infinite;
            background-color: rgba(255, 0, 0, 0.253);
            .cardBodyContainer{
                .iconsContainer{
                    .alarmIcon{
                        color: red
                    }
                }
            }
        }
	}

    .measurerContainer{
        overflow: hidden;
    }

    h5{
        span{
            color: #af7213;
        }
    }
    @keyframes blinkAlarmBorder{
        0%{
            outline: 5px solid red
        }
        100%{
            outline: 5px solid rgba(255, 0, 0, 0.5)

        }
    }
</style>

<style>
    .vue-resizable-handle, .card-footer, .card-header{
        z-index: 20;
    }
</style>