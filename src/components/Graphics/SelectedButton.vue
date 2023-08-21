<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button v-on:click="dataSelected(inputs)" >{{ inputs }}</b-button>
        </b-button-group>
    </div>
</template>

<script>

export default{

    props:['inputs'],

    methods:{
        dataSelected(data){
            this.$emit('buttonSelected', data);
        }
    }

}

</script>

<style lang="scss">

.selected-group-button{
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn, .btn-secondary,.btn-group{
    background-color: var(--color1);
    border: none;
    width: 100%;
}

</style>