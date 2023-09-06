<template>
    <div class="conteiner-graphics">
        <div class="graphics-component">
            <label for="range-2" class="text-graphic">Select a value: </label>
            <div class="graphic-item">
                <b-form-input id="range-2" v-model="valueDisplay" type="range" :min="minValue" :max="maxValue" step="1"></b-form-input>
            
                <div class="mt-2">
                    <div class="conteinerValue">
                        <h2 class="value-graphics">{{ this.valueDisplay }}</h2>
                        <h2 v-if="nameOfSection == 'bitrate'" class="value-graphics">k</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props: ['value', 'minValue', 'maxValue', 'nameOfSection' ],
    
    data: () => {
        return{
            valueDisplay: 10
        }
    },
    
    mounted(){
        this.valueDisplay = this.value;
    },
    
    watch:{
        value(newValue){
            this.valueDisplay = newValue
        },
        
        valueDisplay(newValue){
            this.sendData(newValue)
        }
    },

    methods:{
        sendData(data){
            let value = this.nameOfSection == 'bitrate' ? `${data}` : `${data}`;
            this.$emit('dataGraphic', {name: this.nameOfSection, value: value});
        }
    }
}   
</script>

<style scoped lang="scss">
    .conteiner-graphics{
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: var(--color4);
        padding: 20px;
        font-size: 12px;
        font-family: var(--FontOther);
    }
    
    /*********** Baseline, reset styles ***********/
    input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 25rem;
    }

    /* Removes default focus */
    input[type="range"]:focus {
    outline: none;
    }

    /******** Chrome, Safari, Opera and Edge Chromium styles ********/
    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
    background-color: var(--color4);
    box-shadow: 1px 1px 2px var(--color3);
    border-radius: 0.5rem;
    height: 0.5rem;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -4px; /* Centers thumb on the track */
    background-color: var(--color3);
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
    outline: 3px solid var(--color3);
    outline-offset: 0.125rem;
    }

    /*********** Firefox styles ***********/
    /* slider track */
    input[type="range"]::-moz-range-track {
    background-color: var(--color4);
    border-radius: 0.5rem;
    height: 0.5rem;
    }

    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
    background-color: var(--color3);
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
    }

    input[type="range"]:focus::-moz-range-thumb{
    outline: 3px solid var(--color3);
    outline-offset: 0.125rem;
    }

    .graphics-component{
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .graphic-item{
        display: flex;
        align-items: center;
        width: 100%;
        background-color: var(--color3Gradiente);
        border-radius: 40px;
        padding: 5px;
    }

    .text-graphic{
        font-family: var(--fontLabel);
        font-size: 13px;
        padding: 10px;
    }

    .mt-2{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 20%;
        margin-top: 0px !important;
    }

    .conteinerValue{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        height: 90%;

        background-color: var(--color1Gradiente);
        color: var(--color4);
        border-radius: 50%;

        margin-bottom: 0px !important;
        margin-top: 0px !important;
        margin-left: 6px;
        margin-right: 6px;
    }

    .value-graphics{
        font-size: 20px;
        font-family: var(--fontLabel);
    }
</style>