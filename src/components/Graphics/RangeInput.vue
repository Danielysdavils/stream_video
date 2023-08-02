<template>
    <div class="conteiner-graphics">
        <div class="row-separator"></div>
        <label for="range-2" class="text-graphic">Select a value: </label>
        <b-form-input id="range-2" v-model="valueInterface" type="range" min="0" max="10" step="1"></b-form-input>
        <div class="mt-2">Value: {{ valueInterface }}</div>
    </div>
</template>

<script>
//Metodo quando a data do servidor mude e quando a data do user mude 

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
        flex-direction: column;
        color: var(--color4);
        padding: 20px;
        font-size: 12px;
    }

    .row-separator{
        width: 90%;
        height: 1px;
        background-color: var(--color4);
        border-radius: 5px;
        margin-bottom: 20px;
    }

    input[type="range"]{
        width: 90%;
        -webkit-appearance: none;
                appearance: none;
        background-color: var(--color2);
        border: 1px solid;
        border-color: var(--color4);
        border-radius: 10px;
        margin-bottom: 5px;
    }

    label{
        margin-bottom: 5px;
    }
</style>