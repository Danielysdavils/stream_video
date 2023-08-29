<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button class="buttonItem" :style="setButtonSelected" v-on:click="setButtonClicked(inputs)">{{ inputs.name }}</b-button>
        </b-button-group>
    </div>
</template>

<script>
export default{
    data: () => {
        return{
            dataSelected: '',
            isActiveButton: false
        }
    },

    props:['inputs', 'value', 'nameOfSection'],
   
    onMounted(){
        if(this.inputs.name == this.value)
            this.isActiveButton = true;
    },

    watch: {
        inputs(newData, oldData){
            if(newData.name != oldData.name){
                this.dataSelected = newData;
            }
        }
    },

    computed:{
        setButtonSelected(){
            let style = {}
            this.isActiveButton || this.inputs.status || this.dataSelected.status ? 
            style = 
                {"background-color" : "var(--color4)", "color" : "var(--color1)"}
            : style =
                {"background-color" : "var(--color1)"} 
            return style;
        }
    },

    methods: {
        setButtonClicked(data){
            data.status = true;
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
    font-family: var(--FontOther);
    font-weight: 200;
}

</style>