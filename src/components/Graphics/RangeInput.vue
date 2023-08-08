<template>
    <div class="conteiner-graphics">
        <div class="row-separator"></div>

        <div class="graphics-component">
            <label for="range-2" class="text-graphic">Select a value: </label>
            <div class="graphic-item">
                <b-form-input id="range-2" v-model="valueInterface" type="range" min="0" max="10" step="1"></b-form-input>
                <div class="mt-2">
                    <h2 class="value-graphics">{{ valueInterface }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//Metodo quando a data do servidor mude e quando a data do user mude 
// Desacoplar metodos de chamada de Store do componente??

import { mapActions } from 'vuex'

export default{
    data: () => {
        return{
            valueInterface: ''
        }
    },
    
    watch: {
        valueInterface(newValue){
            this.updateChange(newValue)
        },

        getData(newValue){
            //Atualizo o grafico conforme os dados do servidor
            this.valueInterface = newValue
        }
    },

    methods:{
        ...mapActions({
            sendData : 'store/putData',
            getData : 'store/getAndPopulateData'
        }),

        //Mando e atualizo
        async updateChange(data){
            await this.sendData(data).then(
                response => console.log(response), 
                err => console.log(err)
            )
        },
        
        //recebo e atualizo
        async getData(){
            await this.getData().then(    
                response => this.$set(this.valueInterface, 'valueServer', response), 
                err => console.log('warning! ' + err)
            )
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
    }

    .row-separator{
        width: 50%;
        height: 0.5px;
        background-color: var( --color4Gradiente);
        border-radius: 5px;
        margin-bottom: 20px;
    }

    input[type="range"]{
        width: 90%;
        -webkit-appearance: none;
                appearance: none;
    
        background-color: var(--color3Gradiente);
        border: 1px solid;
        border-color: var(--color4);
        border-radius: 10px;
    }

    input[type="range"]::-ms-thumb{
        background-color: var(--color2);
    }

    label{
        margin-bottom: 5px;
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
        font-size: 15px;
    }

    .mt-2{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 15%;
        margin-top: 0px !important;
    }

    .value-graphics{
        width: 100%;
        background-color: var(--color4Gradiente);
        color: var(--color4);
        border-radius: 50%;

        margin-bottom: 0px !important;
        margin-top: 0px !important;
        margin-left: 6px;
        margin-right: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 20px;
        font-family: var(--fontLabel);
    }
</style>