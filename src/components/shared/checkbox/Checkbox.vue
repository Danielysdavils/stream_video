<template>
    <b-form-group :required="required" class="d-flex align-items-center justify-content-center" :class="{'disabled': disabled }">
        <div class="d-flex">
            <span class="infoIcon" @click.prevent="" v-b-tooltip.hover v-b-tooltip.click :title="infoText" v-if="infoText.length > 0">
                <b-icon-info-circle-fill/>
            </span>
            <label v-if="label.length > 0" id="label" :for="inputId" class="w-100 text-center">
                {{ label }} <span class="required" v-if="required">*</span>
            </label>
        </div>
        <b-form-checkbox :disabled="disabled" class="d-flex justify-content-center checkboxInput" :class="{'disabled': disabled }" :size="size" :id="inputId" v-model="status" :name="name" :value="true" @change="change"
            :unchecked-value="false" />
    </b-form-group>
</template>
<script>
export default {
    props: {
        label: {
            required: false,
            type: String,
            default: ''
        },
        size: {
            required: false,
            type: String,
            default: 'lg'
        },
        name: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        value: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        infoText:{
            type: String,
            required:false,
            default: ''
        }
    },
    computed: {
        inputId() {
            return this.name + "Id_" + Math.random().toString(36).substr(2, 9);
        },
        status() {
            return this.value
        }
    },
    methods: {
        change(e) {
            this.$emit("change", e)
        }
    },
}
</script>
<style scoped lang="scss">
.disabled, .disabled > *{
    opacity: 0.5;
    cursor: not-allowed
}
.infoIcon{
    color: #ff990097
}
</style>
<style>
.custom-control-input:checked~.custom-control-label::before {
    color: white;
    border-color: #3cd2a5;
    background-color: #3cd2a5 !important;
}

.custom-checkbox.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-checkbox .custom-control-label::before {
    background: transparent;
}

.required {
    color: rgba(255, 96, 96);
}
.checkboxInput > label::after{
    cursor: pointer;
}
.checkboxInput.disabled > label::after{
    cursor: not-allowed;
}
</style>