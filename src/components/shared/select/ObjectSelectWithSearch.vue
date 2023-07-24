<template>
    <b-form-group id="form" class="w-100">
        <label id="label" for="inputId">
            Display <span class="required">*</span>
        </label>
        <div class="w-100 d-flex align-items-center" style="gap: 2.5%">
            <v-select id="inputId" style="width: 80%" :options="[]" @input="emitChanges" :label="'text' || 'name'"
                ref="select">
                <template v-slot:no-options="{ search, searching }">
                    <div v-if="search == ''" slot="no-options" @click="btnClickByLabel('')" class="w-100"
                        style="cursor:pointer"><span>Create new</span></div>
                    <template v-if="searching">
                        <div class="w-100" @click="btnClickByLabel(search)" style="cursor:pointer">
                            {{ $i18n.t("notFoundInSelect") }} <em>"{{ search }}"</em>.
                        </div>
                    </template>
                </template>
                <template #search="{ attributes, events }">
                    <input id="inputId" class="vs__search" :required="false" v-bind="attributes" v-on="events" />
                </template>
            </v-select>
            <div style="width: 17.5%">
                <my-button type="text" :title="btnLabel" :buttonStyle="btnStyle" @buttonAction="btn" />
            </div>
        </div>
        <div v-if="isOpen">
            <div class="w-100 h-100 border">
                <slot />
            </div>
        </div>


    </b-form-group>
</template>

<script>
//Utiliza a biblioteca vue-select
import 'vue-select/dist/vue-select.css';
import Button from "../button/TelemetryButton.vue"
export default {
    data() {
        return {
            value: '',
            isOpen: false
        }
    },
    components: {
        "myButton": Button,
    },
    computed: {
        btnLabel() {
            return this.isOpen ? this.$i18n.t("hide") : this.$i18n.t("show")
        },
        btnStyle() {
            return this.isOpen ? 'light' : 'outline-light'
        }
    },
    methods: {
        emitChanges() {
            this.$emit("change", this.value)
        },
        btnClickByLabel(search) {
            this.isOpen = false
            this.$refs.select.searchEl.blur()
            this.btn(search)
        },
        btn(search) {
            console.warn(search)
            this.isOpen = !this.isOpen
        }
    },
    mounted() {
        if (this.selected != undefined) {
            this.value = this.selected
        }
    }
}
</script>

<style>
button.vs__clear {
    display: none;
}
</style>

<style scoped>
.border {
    -webkit-box-shadow: inset 0px 0px 0px 1px white;
    -moz-box-shadow: inset 0px 0px 0px 1px white;
    box-shadow: inset 0px 0px 0px 1px white;
    background:
        linear-gradient(to right, white 4px, transparent 4px) 0 0,
        linear-gradient(to right, white 4px, transparent 4px) 0 100%,
        linear-gradient(to left, white 4px, transparent 4px) 100% 0,
        linear-gradient(to left, white 4px, transparent 4px) 100% 100%,
        linear-gradient(to bottom, white 4px, transparent 4px) 0 0,
        linear-gradient(to bottom, white 4px, transparent 4px) 100% 0,
        linear-gradient(to top, white 4px, transparent 4px) 0 100%,
        linear-gradient(to top, white 4px, transparent 4px) 100% 100%;

    background-repeat: no-repeat;
    background-size: 20px 20px;

    padding: 1rem;

    background-color: hsla(207, 15%, 12%, 0.66);
}

#form>div>input {
    height: 1.5rem;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border: 0.1px solid rgb(217 217 217 / 89%);
    color: white;
    border-radius: 8px;
    width: 100%;
}

label {
    text-align: center;
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
</style>

<style lang="scss">
#form>div {
    width: 100%;
}

.invalid-feedback,
.is-invalid {
    position: relative !important;
    top: 0px !important
}

.v-select.vs--searchable {
    color: black !important;

    &>div {
        background-color: rgba(255, 255, 255, 0.05);
        padding: 0.65rem;
        border: 0.1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 8px;
    }

    .vs__selected {
        color: white
    }

    .vs__actions {
        .vs__clear {
            fill: #dc3545
        }

        .vs__open-indicator {
            fill: white
        }
    }

    .vs__selected-options {
        .vs__selected {
            background: rgb(22 3 3 / 25%);

            .vs__deselect {
                fill: #dc3545
            }
        }
    }
}
</style>