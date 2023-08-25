<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button class="buttonItem" :style="setButtonSelected" v-on:click="dataSelected(inputs)" >{{ inputs }}</b-button>
        </b-button-group>
    </div>
</template>

<script>

export default{
    //Inputs --> botão a criar
    //Value --> botão clicado [api]
    //Mudar a função do butão pra fora do componetne
    props:['inputs', 'value'],

    data: () => {
        return{
            buttonClicked: false,
            buttonClick: ''
        }
    },

    watch: {
        value(newData){
            console.log(newData);
            this.getDataClicked(newData)
        }
    },

    methods:{

        //Envia a opção clicada pelo usuário
        dataSelected(data){
            this.buttonClicked = true;
            this.$emit('buttonSelected', data);
        },

        getDataClicked(newData){
            if(newData == this.inputs || this.buttonClicked != ''){
                this.buttonClicked = true;
            }
            this.buttonClick = newData;
        }
    },

    computed:{
        setButtonSelected(){
            let style = {}

            this.buttonClicked ? style = {"background-color" : "var(--color4)"} : style = {"background-color" : "var(--color1)"}
            
            return style;
        }
    }
}
</script>

<style lang="scss">

.selected-group-button{
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn, .btn-secondary,.btn-group{
    border: none;
    width: 100%;
}

</style>