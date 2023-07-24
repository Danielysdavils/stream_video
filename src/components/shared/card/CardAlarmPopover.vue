<template>
    <b-popover v-if="loaded" :target="target" triggers="hover focus" placement="top" custom-class="popoverChangeMeasurer">
        <template #title>Alarmes</template>
        <div class="alarmList">
            <div class="alarmItem" v-for="alarme in alarmList">
                <!-- <h5>{{alarmDescription[0]}} <span class="name">{{alarme.alarmName}}</span> {{alarmDescription[1]}} <span class="condition">{{alarme.alarmCondition}}</span> <strong>{{alarme.alarmValue}}</strong></h5> -->
                <h5>{{alarmDescriptionCondition(alarme)}}</h5>
            </div>
        </div>
    </b-popover>
</template>

<script>

export default {
    data(){
        return {
            loaded: false
        }
    },
    props:{
        target: {
            type:String,
            required:true
        },
        alarmList:{
            type: Array,
            required:true
        }
    },
    methods:{
        alarmDescriptionCondition(alarm){
            const alarmDescription = this.$i18n.t('whenAlarmWillBeActive').split("{alarmName}")
            var alarmDescriptionStart = `${alarmDescription[0]} ${alarm.alarmName} ${alarmDescription[1]} `
            if(alarm.alarmCondition == 106 || alarm.alarmCondition == 107){
                let translate
                if(alarm.alarmCondition == 106) translate = "betweenInRangeValues"
                else translate = "betweenOutRangeValues"

                alarmDescriptionStart += this.$i18n.t(translate, {
                    lowValue: alarm.alarmLow,
                    highValue: alarm.alarmHigh
                })
            }else {
                const operator = this.operators.find(op => op.id == alarm.alarmCondition).name
                alarmDescriptionStart += `${this.$i18n.t(operator).toLowerCase()} ${alarm.alarmValue}`
            }
            return alarmDescriptionStart
        }
    },
    async mounted(){
        this.loaded = false
        this.service = new this.$alarmOperatorSerice();
        await this.service.list().then(op => {
            this.operators = op
        })
        this.loaded = true
    }
}
</script>

<style scoped lang="scss">
    .popoverChangeMeasurer{
        background-color: rgba(0, 0, 0, 0.822);
        border: 1px solid white; 
    }
    .alarmItem{
        padding: 0.5rem;
        h5{
            color: white;
            font-size: 0.95rem;
            font-weight: 300;
            text-align: justify;
            .name{
                color: #3cd2a5;
                font-weight: 600
            }
            .condition{
                color: rgb(235, 71, 71);
                font-weight: 600
            }
            strong{
                font-weight: 700
            }
        }
        border-bottom: 1px solid rgb(44, 44, 44);
    }
</style>