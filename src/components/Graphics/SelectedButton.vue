<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button class="buttonItem" :style="setButtonSelected" v-on:click="dataSelected(inputs)" >{{ inputs }}</b-button>
        </b-button-group>
    </div>
</template>

<script>

export default{
    //Inputs --> Qtd de botões a criar
    //Value --> botão clicado [api]
    
    props:['inputs', 'value'],

    data: () => {
        return{
            buttonClicked: false,
            buttonClick: ''
        }
    },

    watch: {
        value(newData){
            this.getDataClicked(newData)
        }
    },

    methods:{
        dataSelected(data){
            this.buttonClicked = true;
            
            this.$emit('buttonSelected', data);
        },

        //resolution.status ? true : this.buttonClick

        getDataClicked(newData){
            //this.buttonClicked = newData.forEach(resolution => console.log(resolution));
            console.log(newData);
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