<template>
    <div class="specialControl">
        <label class="labelChild" for="vehicle">{{ $i18n.t(name) }}</label>
            <b-form-select :disabled="disabled"  class="w-100 mb-2 formChild" v-model="element" @change="change" :style="formChildWidth">
                <option class="select" v-for="dataValue in computedData" :key="dataValue.id" :value="dataValue.id">
                    <label v-if="dataValue.title">{{dataValue.title}}</label>
                    <label v-else-if="dataValue.name">{{dataValue.name}}</label>
                    <label v-else-if="dataValue.model">{{dataValue.model}}</label>
                    <label v-else-if="dataValue.originEmail">{{dataValue.originEmail}}</label>
                </option>  
                <b-form-select-option :value="null" >{{$i18n.t('empty')}}</b-form-select-option>
            </b-form-select>
        <span v-if="showButton">
            <myButton class="controlChild mb-2" type="button" :title="computedShowInfo"  buttonStyle="secondary" @buttonAction="toggleInfo"/>
            <div v-if="showInfo">
                <component class="componentChild" :is="currentComponent" :id="element" @addAction="update" @removeAction="remove"></component>
            </div>
        </span>
    </div>
</template>


<script>
import {i18n} from '../../../lang/lang';
import Button from "../button/Button.vue";
import DVCComponent from '../../dvc/DVCInfo.vue'
import GroupComponent from '../../group/GroupInfo.vue';
import ScheduleComponent from '../../schedule/ScheduleInfo.vue';
import OriginComponent from '../../origin/OriginInfo.vue';
import TelemetryComponent from '../../telemetry/TelemetryInfo.vue';
import EquipmentComponent from '../../equipment/EquipmentInfo.vue';
import VehicleComponent from '../../vehicle/VehicleInfo.vue';
import VehicleModelComponent from '../../vehicleModel/VehicleModelInfo.vue'
import PeriodComponent from '../../period/PeriodInfo.vue';
import ProfileComponent from '../../profile/ProfileInfo.vue';

export default {

    components: {
        myButton: Button,
        DVCComponent: DVCComponent,
        GroupComponent: GroupComponent,
        ScheduleComponent: ScheduleComponent,
        OriginComponent, OriginComponent,
        TelemetryComponent: TelemetryComponent,
        EquipmentComponent: EquipmentComponent,
        VehicleComponent: VehicleComponent,
        VehicleModelComponent: VehicleModelComponent,
        PeriodComponent: PeriodComponent,
        ProfileComponent: ProfileComponent,
    },


    props: {
        disabled: {
            type: Boolean,
            default: false,
        },

        destails: {
            type: Boolean,
            default: true,
        },

        name: {
            type: String,
            default: '',
        },
        selectedComponent: {
            type: String,
            default: '',
        },
        dt: [],
        el: {},
        initialCountDown: {
            type: Number,
            default: 3,
        },
        showButton:{
            type: Boolean,
            required: false,
            default: true
        }
    },

    data() {
        return { 
            countDown: this.initialCountDown,
            showInfo: false,
            currentComponent : this.selectedComponent,
            data: this.dt,
            element: this.el,
        }
    },

    computed : {
        computedShowInfo() {
            return this.showInfo ? i18n.t('hide') : i18n.t('show');
        },

        computedData() {
            return this.data;
        },

        computedDetailts() {
            return this.details;
        },
        
        formChildWidth(){
            if(this.showButton) {
                return{ '--form-width' : "65%"}
            } 
            else {
                return{ '--form-width' : "100%"}
            }
        }
    },

    methods: {

        toggleInfo() {
            this.showInfo = !this.showInfo;
        },

        change() {
            var reopen = false

            if(this.showInfo) {
                this.toggleInfo();
                reopen = true;
            }

            if(this.element != null) {
                this.computedData.forEach((el) => {
                    if(el.id === this.element) {
                        this.$emit('change', el);
                    }
                })

                if(reopen) {
                    setTimeout(() => {
                        this.showInfo = !this.showInfo;
                    }, 100)
                }   
            } else {
                this.$emit('change', this.element);
            }
          
         

        },

        update(newElement) {
            console.log(newElement);
            if(!newElement.update) {
                console.log("new");
                this.$emit('change', newElement.value);
                this.data[this.data.length-1] = newElement.value;
                this.data.push(newElement.element);
            } else {
                this.data.forEach((element, index, array) => {
                    console.log(element);
                    if(element.id === newElement.value.id) {
                        array[index] = newElement.value;
                    }
                })
            }

            this.element = newElement.value.id;
            this.toggleInfo();
        },

        remove(element) {
            this.toggleInfo();

            this.data = this.data.filter((el) => {
                if(el.id != element.value.id) {
                    return el;
                }
            })

            console.log("remove");
            console.log(this.data);
            this.$emit('change', {});

        },

        countDownTimer () {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.data = this.dt,
                    this.element = this.el,
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
    },

    created() {
        this.countDownTimer();
    }

}

</script>


<style lang="scss" scoped>

.specialControl {
    width: 100%;
    margin: 0 auto;

    @media(min-width: 320px) and (max-width: 425px) {
        display: flex;
        flex-direction: column;
    }
}

.formChild {
    width: var(--form-width) !important;
    padding: 5px;
    margin: 5px auto;
    min-height: 25px;

    @media(max-width: 768px) {
        width: 100% !important;
        margin-bottom: 2em;
    }
}

.controlChild {
    width: 30%;
    padding: 5px;
    margin: 0 auto;
    min-height: 50px;

    @media(max-width: 768px) {
        width: 100%;
        margin: 1em 0;
    }
}

.labelChild {
    margin-right: 35%;
}

.componentChild {
    border: 1px solid;
    border-radius: 3px;
    padding: 5px;
    border-color: #6c757d;
    margin-top: 2em;

    @media(min-width: 425px) and (max-width: 768px) {
        margin-top: 5em;
    }
}

/* Breakpoints */

@media(min-width: 768px) and (max-width: 991px) {
    .specialControl {
        margin: 0;
    }
}

</style>