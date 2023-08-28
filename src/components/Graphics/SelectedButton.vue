<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button class="buttonItem" :style="setButtonSelected">{{ inputs }}</b-button>
        </b-button-group>
    </div>
</template>

<script>
export default{
    props:['inputs', 'isActive', 'setIsActive'],
   
    computed:{
        setButtonSelected(){
            let style = {}
            this.isActive && !this.setIsActive || !this.isActive && this.setIsActive
            ? style = 
                {"background-color" : "var(--color4)", "color" : "var(--color1)"}
            : style =
                {"background-color" : "var(--color1)"} 
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
    font-family: var(--FontOther);
    font-weight: 200;
}

</style>