<template>
    <b-form-group
        :class="{'selectDisabled': disabled}"
        :disabled="disabled"
        :id="`form_${inputId}`"
        class="w-100 animate__animated"
        :required="required"
        >
            <div class="d-flex w-100 justify-content-between align-items-center">
                <label 
                id="label" 
                :for="inputId" 
                style="width:100%;">
                <span class="infoIcon" v-b-tooltip.hover v-b-tooltip.click :title="infoText" v-if="infoText.length > 0">
                    <b-icon-info-circle-fill/>
                </span> {{label}} <span class="required" v-if="required" title="required">*</span>
                </label>

                <div ref="detailsButton" class="detailsButton" v-on:click="ondblclick" v-if="hasDetails && value">
                    <b-icon-info-circle/>
                    <p v-on:dblclick="ondblclick">{{$i18n.t('details')}}</p>
                </div>

                <div v-if="toggleItems" class="toggleItemsButton" @click="toggleItemsAction">
                    <p><b-icon :icon="toggleIcon"/>{{toggleText}}</p>
                </div>
            </div>

        

            <v-select :disabled="disabled" v-model="value" :id="inputId" :get-option-label="optionLabel" :multiple="multiple" :options="computedOptions" @input="emitChanges" @search="changeSearch" :label="optionText" class="w-100">
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        <div class="w-100" v-on:dblclick="ondblclick">
                            {{$i18n.t("notFoundInSelect")}} <em>"{{ search }}"</em>.
                        </div>
                    </template>
                </template>
                <template #search="{attributes, events}">
                    <input
                        :id="inputId"
                        class="vs__search"
                        :required="!value"
                        v-bind="attributes"
                        v-on="events"
                    />
                </template>

            </v-select>

            <p v-if="!isValid" class="invalidMessage">{{invalidMessage}}</p>

            <!-- Informações sobre o componente -->
            <transition name="fade" mode="out-in">
                <div v-if="component!='' && showComponent" class="w-100 detailsContainer component">
                    <page-header :name="$i18n.t(name)" :button="false"/>
                    <component 
                    :is="component"
                    :id="value.id" 
                    :key="componentKey"
                    @cancel="cancelHandler"
                    @change="changeHandler"
                    @addElement="addElement"
                    @updateElement="updateElement"/>
                </div>
            </transition>

        
    </b-form-group>
</template>

<script>
//Utiliza a biblioteca vue-select 

import 'vue-select/dist/vue-select.css';
export default {
    data(){
        return{
            value: '',
            searchText: '',
            componentKey: 0,
            showComponent: false,
            isToggled: false,
        }
    },
    props:{
        options:{
            type: Array,
            required: true
        },
        optionText: {
            type: String,
            required: true
        },
        label:{
            type: String,
            required: false,
            default: 'text',
        },
        name:{
            type: String,
            required: true
        },
        invalidMessage:{
            type: String,
            required: false,
            default: 'Invalid'
        },
        isValid:{
            type: Boolean,
            required: false,
            default: true
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        multiple:{
            type: Boolean,
            required: false,
            default: false
        },
        selected: {
            type: undefined,
            required: false,
            default: undefined
        },
        component: {
            type: String,
            required: false,
            default: ''
        },
        hasDetails:{
            type: Boolean,
            required:false,
            default:false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        toggleItems:{
            type:Boolean,
            required:false,
            default: false
        },
        toggleLabels:{
            type:Array,
            required:false,
        },
        infoText:{
            type:String,
            required:false,
            default: ''
        },
        translate:{
            type: Boolean,
            required:false,
            default: false
        }

    },
    
    computed:{
        inputId(){
            return this.name + "Input"
        },

        toggleIcon(){
            return this.isToggled ? 'eye-slash-fill' : 'eye-fill'
        },

        toggleText(){

            return this.isToggled ? this.toggleLabels[0]: this.toggleLabels[1]
        },

        computedOptions(){
            var options = this.options
            const optionText = this.optionText

            if(this.searchText.length == 0) return options
            const regex = new RegExp('^' + this.searchText, 'i');
            const filtredList = options.filter(item => regex.test(this.translate ? this.i18n.t(item[optionText]) : item[optionText]))
            return filtredList
        }
        
    },

    methods:{
        updateElement(element){
            const index = this.options.map(item => item.id).indexOf(element.value.id)
            this.options[index] = element.value
            this.closeItems()
        },
        optionLabel(label){
            const optionText = this.optionText
            return this.translate ? this.$i18n.t(label[optionText]) : label[optionText]
        },
        changeSearch(text){
            this.searchText = text
        },
        ondblclick() {
            if(this.$refs.detailsButton != undefined)
            {
                this.showComponent = !this.showComponent;
                this.$refs.detailsButton.classList.toggle("open")
            }
        },
        toggleItemsAction(){
            this.isToggled = !this.isToggled
            this.$emit("toggle", this.isToggled)
        },

        closeItems() {
            this.showComponent = false;
            this.$refs.detailsButton.classList.toggle("open")
        },

        emitChanges(e){
            if(e.id == 0){
                console.log(e.id);
                this.showComponent = true;
                this.$refs.detailsButton.classList.toggle("open")
            }
            else{
                if(this.component == 'displayInfo'){
                    if(this.value.id) {
                        this.service
                        .search(this.value.id)
                        .then((el) => {
                            this.$emit("getDivisions", el.divisions)
                        })
                    }
                } 
                this.componentKey += 1;
                this.$emit("change", this.value)
            }
        },

 
        changeHandler(e){
            this.$emit("change", e)
        },
        cancelHandler(){
            if(this.$refs.detailsButton != undefined)
            {
                this.showComponent = false
                this.$refs.detailsButton.classList.remove("open")
            }
        },

        addElement(newElement) {
            console.log(newElement);
            this.options[this.options.length - 1] = newElement.value;
            this.options.push(newElement.element)
            this.componentKey += 1;
            this.showComponent = false;
            this.$refs.detailsButton.classList.remove("open");
        },
    },

    mounted(){
        this.service = new this.$displayService();
        //console.log(this.options)
        //console.log(this.selected)
        setTimeout(() => {
            if(this.selected != undefined){
                this.value = this.selected
                if(Number.isInteger(this.value)){ // recebe id 
                    console.log("ID")
                    console.log(this.options)
                    this.options.forEach(item =>{
                        if(item.id == this.value){
                            this.value = item
                        }
                    })
                }
            }
        }, 200)
        this.$el.children[0].classList.add('w-100')
    
    },
    
    watch:{
        isValid(){
            this.$el.classList.remove("animate__headShake")
            if(!this.isValid){
                this.$el.classList.add("animate__headShake")
            }
        }
    }
}
</script>

<style scoped>
    .infoIcon{
        margin-right: 0.25rem;
        color: #e0900f;
    }
    .selectDisabled{
        opacity: 0.75;
    }
    .invalidMessage{
        color: #c43845;
        margin: 0;
        font-style: italic;
        font-weight: bolder;
        background: #b92e2e2b;
        opacity: 1;
        text-align: center;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .component {
        border: 0.1px solid rgb(217 217 217 / 89%);
        border-radius: 8px;
        padding: 1rem;
    }

    #form > div > input{
        height: 1.5rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border: 0.1px solid rgb(217 217 217 / 89%);
        color: white;
        border-radius: 8px;
        width: 100%;
    }
    label{
        text-align: left;
        color: white;
        opacity: 0.75;
    }
    .input{
        height: 3rem;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border: 0.1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 8px;
    }
    .required{
        color: rgba(255,96,96);
    }

    .control input{
        background-color: transparent;
    }
    .suggestionSpan{
        background-color: rgb(215, 221, 223) !important;
        width: 100% !important;
        height: 100% !important;
    }
</style>

<style lang="scss">
    .detailsButton{
        width: auto;
        // min-width: 80px;
        cursor: pointer;
        background-color: transparent;
        border: 1.75px solid #e08f0e;
        padding: 0.15rem 0.5rem;
        border-radius: 10rem;
        opacity: 50%;
        margin-bottom: 0.25rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: space-between;
        transition: opacity 0.25s ease-in-out, background-color 1s ease-in;
        &.open{
            background-color: #e08f0e;
            transition: background-color 1s ease-in;
            opacity: 1;
        }
        p{
            opacity: 1;
            margin: 0;
        }
        &:hover{
            transition: opacity 0.5s ease-in-out;
            opacity: 1;
        }
    }

    .detailsContainer{
        margin: 0.5rem 0;
    }
    .toggleItemsButton{
        width: 100%;
        text-align: end;
        cursor: pointer;
    }
    #form > div{
        width: 100%;
    }

    .v-select.vs--searchable{
        color: black !important;
        & > div{
            background-color: rgba(255, 255, 255, 0.05);
            padding: 0.65rem;
            border: 0.1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 8px;
        }
        .vs__selected{
            color: white
        }
        .vs__actions{
            .vs__clear{
                fill: #dc3545
            }
            .vs__open-indicator{
                fill: white
            }
        }
        .vs__selected-options{
            .vs__selected{
                background: rgb(22 3 3 / 25%);
                .vs__deselect{
                    fill: #dc3545
                }
            }
    }
    
    }
    .vs--disabled .vs__clear, .vs--disabled .vs__dropdown-toggle, .vs--disabled .vs__open-indicator, .vs--disabled .vs__search, .vs--disabled .vs__selected {
        background: transparent !important;
    }
</style>