<template>
    <b-form-group class="form w-100" :invalid-feedback="invalidMessage" :state="validate ? state : null"
        :required="required">
        <label v-if="label.length" id="label" :for="inputId" style="width:100%;">
            {{ label }} <span class="required" v-if="required" title="required">*</span>
        </label>
        <b-input-group size="lg" :append="append" :prepend="prepend">
            <b-form-input :type="type" :disabled="disabled" class="teste" :class="{ 'hasAppend': hasTextAppend }"
                :state="validate ? state : null" :style="disabledColor" :id="inputId" v-model="input" @keyup="emitChanges"
                @change="emitChanges" required :min="min" :max="max" :step="step" :value="value" trim></b-form-input>
        </b-input-group>

    </b-form-group>
</template>

<script>
export default {
    data() {
        return {
            input: this.value
        }
    },
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        invalidMessage: {
            type: String,
            required: false,
            default: ''
        },
        validate: {
            type: Boolean,
            required: false,
            default: false
        },
        isValid: {
            type: Boolean,
            required: false,
            default: null
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        type: {
            type: String,
            required: false,
            default: "text"
        },
        value: {
            type: undefined,
            required: false,
            default(props) {
                if (props == undefined) return 0
                else return props
            }
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        min: {
            type: Number,
            required: false
        },
        max: {
            type: Number,
            required: false
        },
        step: {
            type: Number,
            required: false,
        },
        append: {
            type: String,
            required: false,
            default: ''
        },
        prepend: {
            type: String,
            required: false,
            default: ''
        },
    },
    computed: {
        state() {
            return this.isValid
        },
        inputId() {
            return this.name + "Input"
        },
        disabledColor() {
            if (this.disabled) return { "--background-color": "#32323233" }
            else return { "--background-color": "#ffffff0d" }
        },
        hasTextAppend() {
            return this.append != ''
        }

    },
    methods: {

        emitChanges() {
            this.$emit("changeValue", this.input)
        },
    },
    mounted() {
        setTimeout(() => {
            this.input = this.value
        }, 2000)
    },
    watch: {
        state() {
            this.$el.classList.remove("animate__headShake")
            if (!this.state) {
                setTimeout(() => {
                    this.$el.classList.add("animate__headShake")
                }, 100)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.form {
    min-height: 0px;
    max-width: 90vw;
}

.form>input {
    height: 3rem;
    background-color: var(--background-color);
    padding: 1rem;
    border: 0.1px solid rgb(217 217 217 / 89%);
    color: white;
    border-radius: 8px;
    width: 100%;
}

input.form-control {
    background: #ffffff0d;
    color: white;
}

input:focus {
    background-color: var(--background-color);
    color: white;

}

input.hasAppend {
    text-align: end;
}

label {
    text-align: left;
    color: white;
    opacity: 0.75;
}

.input {
    height: 3rem;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border: 0.1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 8px;
}

.required {
    color: rgba(255, 96, 96);
}

.input-group-text {
    border: 1px solid white !important;
}
</style>

<style lang="scss">
.form>div {
    width: 100%;
}

.invalid-feedback,
.is-invalid {
    position: relative !important;
    top: 0px !important;

    .d-block,
    .invalid-feedback {
        font-size: 1rem;
        color: #c43845;
        margin: 0;
        font-style: italic;
        font-weight: bolder;
        background: #b92e2e2b;
        opacity: 1;
        text-align: center;
    }
}
</style>