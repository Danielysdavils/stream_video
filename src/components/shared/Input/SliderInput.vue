<template>
    <div class="slidecontainer form">
        <label 
            :for="inputID" 
            style="width:100%;">
                {{label}} <span class="required" v-if="required">*</span>
        </label>
        <input type="range" :min="min" :max="max" v-model="sliderValue" class="slider" :id="inputID" @change="teste">
    </div>
</template>

<script>
export default {
    data(){
        return{
            sliderValue: ''
        }
    },
    props:{
        name: {
            type: String,
            required: true
        },
        label:{
            type:String,
            required:true
        },
        required:{
            type:Boolean,
            required: false,
            default: false
        },
        min:{
            type: undefined,
            required:true
        },
        max:{
            type: undefined,
            required:true
        }
    },
    computed:{
        inputID(){
            return `${this.name}Input`
        }
    },
    methods:{
        teste(v){
            this.$emit("change", v.srcElement.value)
        }
    }
}
</script>

<style scoped lang="scss">
    .slidecontainer {
    width: 100%; /* Width of the outside container */
    }

    /* The slider itself */
    .slider {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        border-radius: 50px;
        height: 15px;
        background: rgba(255, 255, 255, 0.05);
        border: 0.1px solid rgba(255, 255, 255, 0.3);
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
    }

    /* Mouse-over effects */
    .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #10627e; /* Green background */
    border: 2px solid #22b0df;
    border-radius: 100%;
    cursor: pointer; /* Cursor on hover */
    &:active{
        background: #22b0df;
    }
    }

    .slider::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #10627e; /* Green background */
        border: 2px solid #22b0df;
        border-radius: 100%;
        cursor: pointer; /* Cursor on hover */
        &:active{
            background: #22b0df;
        }
    }

    .form
    {
        min-height: 0px;
    }
    .form > input{
        border: 0.1px solid rgb(217 217 217 / 89%);
    }
    input.form-control {
        background: #ffffff0d;
        color: white;
    }
    input:focus{
        background-color: var(--background-color);
        color: white;

    }
    label{
        text-align: left;
        color: white;
        opacity: 0.75;
    }
    .input{
        height: 3rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border: 0.1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 8px;
    }
    .required{
        color: rgba(255,96,96);
    }
    .input-group-text {
        border: 1px solid white !important;
    }
</style>