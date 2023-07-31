<template>
    <div class="conteiner-graphics">
        <div class="row-separator"></div>
        <label for="range-2" class="text-graphic">Select a value: </label>
        <b-form-input id="range-2" v-model="value" type="range" min="0" max="10" step="1"></b-form-input>
        <div class="mt-2">Value: {{ value }}</div>
    </div>
</template>

<script>

export default{
    data: () => {
        return{
            value: this.DataRecive,
            clickedItem: ''
        }
    },

    props: ['DataRecive', 'itemSelected'],
    
    computed:{
        sendData : () => {
            this.$emit('dataUpdate', this.value)
        }
    },

    methods:{
        printaData(){
            console.log(this.value);
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