<template>
    <b-popover :disabled="disabled" :target="id" triggers="hover" :placement="direction" custom-class="popoverChangeMeasurer">
        <template #title>
            <div class="w-100 d-flex justify-content-between align-items-center">
                <span>{{title}}</span>
                <b-icon :icon="iconName" @click="toggleView"/>
            </div>
        </template>
        <div v-if="isList" style="min-width:10rem">
            <div class="measurerItem" v-for="item in info" :key="info.indexOf(item)" @click="change(item)" :style="listItemIsSelected(item)">
                <span>
                    {{translate ? $i18n.t(item[optionText]):item[optionText]}}
                </span>
            </div>
        </div>
        <div v-else class="w-100" style="min-width:10rem">
            <select-input name="changeGroup" :optionText="optionText" :label="''" :options="info" translate :required="false" :selected="selected" @change="change"/>
        </div>
    </b-popover>
</template>

<script>
export default {
    data(){
        return{
            isList: true
        }
    },
    props:{
        id: {
            type:String,
            required:true
        },
        info:{
            type: Array,
            required: true
        },
        optionText:{
            type: String,
            required: true
        },
        title:{
            type:String,
            required:true
        },
        selected:{
            type: undefined,
            required:false
        },
        direction: {
            required:false,
            default: 'right',
            type:String
        },
        disabled:{
            type:Boolean,
            required:false,
            default:false
        },
        translate:{
            type: Boolean,
            required:false,
            default:false
        }

    },
    computed:{
        iconName(){
            return this.isList ? "list-ul" : "menu-down"
        }
    },
    methods:{
        change(item){
            if(item.id != this.selected && item[this.optionText] != this.selected) this.$emit("changeMeasurer", item)
        },
        toggleView(){
            this.isList = !this.isList
        },
        listItemIsSelected(item){
            if(item.id == this.selected || item[this.optionText] == this.selected){
                return {
                    "--selectedColor" : "white",
                    "--textColor" : "black"
                }
            }else{
                return {
                    "--selectedColor" : 'rgba(0, 0, 0, 0.822)',
                    "--textColor" : "white"
                }
            }
        }
    },
}
</script>

<style scoped>
    .popoverChangeMeasurer{
        background-color: rgba(0, 0, 0, 0.822);
        border: 1px solid white;
    }
    .measurerItem{
        padding: 0.5rem;
        width: "100%";
        text-align: "center";
        border-bottom: 1px solid rgb(190, 190, 190);
        color: var(--textColor)
    }
    .measurerItem:hover{
        background: rgba(219, 219, 219, 0.66);
        cursor: pointer;
    }
    .measurerItem:active{
        background-color: white;
        color: black;
        font-weight: 500;
    }
    .measurerItem:last-child{
        border-bottom: none;
    }
    v-select.vs--single.vs--searchable{
        width: 10rem !important;
    }
    svg{
        cursor: pointer;
    }
    .measurerItem{
        background-color: var(--selectedColor);
    }
</style>