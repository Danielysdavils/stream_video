<template>
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <toggle-button :value="toggle"
        :color="digitalColor"
        @change="changeStates"
        :sync="true"
        :labels="digitalLabels"
        :height="height"
        :width="width"
        :fontSize="30"/>
    </div>
</template>

<script>
import {ToggleButton} from 'vue-js-toggle-button'
export default {
    components:{
        ToggleButton
    },
    props:{
        info:{
            required:true,
            type:Object,
        },
        divisionsColorList:{
            type:Array,
            required:true
        },
        topic: {
            type: String,
            required:false,
            default: ''
        },
        value: {
            type: Number,
            required: false,
        },
    },
    data(){
        return{
            height: 60, 
            width: 150,
            isOn: undefined
        }
    },
    computed:{
        minMax(){
            var min
            var max
            this.divisionsColorList.forEach((item, index) => {
                if(!index){
                    min = item
                    max = item
                }
                else{
                    if(item.start < min.start) min = item
                    else if (item.start > max.start) max = item
                }
            })
            return [min, max]
        },
        computedValue(){
            return this.value
        },
        digitalLabels(){
            const list = this.minMax
            const uncheckedLabel = list[0].text ? list[0].text : 'O'
            const checkedLabel = list[1].text ? list[1].text : "I"
            return {checked: checkedLabel, unchecked: uncheckedLabel}
        },
        digitalColor(){
            const offColor = this.minMax[0].color
            const onColor = this.minMax[1].color
            return {
                "checked" : onColor,
                "unchecked" : offColor
            }
        },
        toggle(){
            return this.isOn == 1
        },
    },
    methods:{
        changeStates(){
            const newState = this.isOn ? 0 : 1
            Encoder.encode([{topic: this.topic, changeTo: newState}])
            this.changeToggle()
            console.warn(this.info)

        },
        changeToggle(){
            this.isOn = !this.isOn
        },
        resizeMeasurer(w, h){
            const width = w*0.25
            const height = h *0.125
            
            this.width  = width  < 100 ? 100 : width
            this.height = height <  40 ?  40 : height

        }
    },
    mounted(){
        this.isOn = parseInt(this.value)
    },
    watch:{
        value(){
            this.isOn = parseInt(this.value)
        }
    }
}
</script>

<style>
span.v-switch-label.v-right{
    overflow: hidden;
    width:75%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
span.v-switch-label.v-left{
    overflow: hidden;
    width:75%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>