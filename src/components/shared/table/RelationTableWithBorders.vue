<template>
    <div>
        <b-collapse :id="collapseId" class="full">
            <div class="grid">
                <div class="ml-3 mr-3 mb-3 tableContainer" style="grid-column: 1/2">
                    <div class="tableHeader text-center p-2">{{ $i18n.t("avaliable") }}</div>
                    <div class="tableBody p-3">
                        <div v-for="item in computedAvaliableItems" :key="item.id" class="">
                            <div class="d-flex align-items-center" style="gap: 0.5rem">
                                <checkbox class="checkbox" label="" :name="'checkbox' + item.id"
                                    @change="selectedAdd(item)" />
                                <div v-if="item.nickname">{{ item.nickname }}</div>
                                <div v-else-if="item.text">{{ item.text }}</div>
                                <div v-else-if="item.subtitle">{{ item.subtitle }}</div>
                                <div v-else-if="item.name">{{ item.name }}</div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center flex-column align-items-center btnArea" style="gap: 1rem">
                    <button type="button" @click="update">
                        <b-icon-arrow-left-right class="arrow" /><br>
                    </button>
                </div>
                <div class="ml-3 mr-3 mb-3 tableContainer" style="grid-column: 3/4">
                    <div class="tableHeader text-center p-2">{{ $i18n.t("selected") }}</div>
                    <div class="tableBody p-3">
                        <div v-for="selected in computedSelectedItems" :key="selected.id">
                            <div class="d-flex align-items-center" style="gap: 0.5rem">
                                <checkbox class="checkbox" label="" :name="'checkbox' + selected.id"
                                    @change="selectedRemove(selected)" />
                                <div v-if="selected.nickname">{{ selected.nickname }}</div>
                                <div v-else-if="selected.text">{{ selected.text }}</div>
                                <div v-else-if="selected.subtitle">{{ selected.subtitle }}</div>
                                <div v-else-if="selected.name">{{ selected.name }}</div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script>
import Checkbox from '../checkbox/Checkbox.vue';
export default {
    components: { Checkbox },
    data() {
        return {
            addItems: [],
            removeItems: [],
            selectedItems: [],
            avaliableItems: [],
        }
    },
    props: {
        id: {
            type: [Number, String],
            required: false,
            default: 0,
        },
        name: {
            type: String,
            required: false,
            default: "element"
        },
        items: {
            type: Array,
            required: true
        },
        insertedItems: {
            type: Array,
            required: true
        },
    },

    computed: {
        computedSelectedItems() {
            return this.selectedItems;
        },

        computedAvaliableItems() {
            return this.avaliableItems;
        },

        /* id que serve para referenciar o collapse do dispositivo e não influenciar em outros collapses */
        collapseId() {
            return `CollapseVariables-${this.id}`
        },
    },


    methods: {
        toggleOpen(isOpen) {
            this.isOpen = !this.isOpen
            this.$root.$emit('bv::toggle::collapse', this.collapseId)
            // this.$refs.arrow.style.transform = `rotate(${isOpen ? -180 : 0}deg)`

        },

        selectedAdd(item) {
            console.warn("add")
            if (!this.addItems.includes(item)) this.addItems.push(item)
            else this.addItems = this.addItems.filter(i => { if (item != i) return i })
        },
        selectedRemove(item) {
            console.warn("remove")
            if (!this.removeItems.includes(item)) this.removeItems.push(item)
            else this.removeItems = this.removeItems.filter(i => { if (item != i) return i })
        },

        update() {

            console.log("UPDATE");
            console.log(this.addItems);
            console.log(this.removeItems);

            this.addItems.forEach(el => {
                this.selectedItems.push(el);
                this.removeFromAvaliableList(el);
            })

            this.removeItems.forEach(el => {
                this.avaliableItems.push(el);
                this.removeFromSelectedList(el);
            })

            this.addItems = [];
            this.removeItems = [];
            console.log(this.selectedItems);

            this.$emit("selectedItems", this.selectedItems)
        },

        removeFromAvaliableList(item) {
            this.avaliableItems = this.avaliableItems.filter(i => {
                if (item != i) {
                    return i
                }
            })
        },

        removeFromSelectedList(item) {
            this.selectedItems = this.selectedItems.filter(i => {
                if (item != i) {
                    return i
                }
            })
        }
    },

    created() {
        setTimeout(() => {
            this.avaliableItems = this.items;
            this.selectedItems = this.insertedItems;
        }, 1000)
    }
}
</script>

<style scoped lang="scss">
.tableToggle {
    text-align: start;
    cursor: pointer;

    h4 {
        //background-color: rgb(80 99 99);
        height: 3px;
        vertical-align: middle;
        line-height: 1px;

        span {
            padding: 10px;
            background-color: #1f2c38;

            svg {
                font-size: 0.8rem;
            }
        }
    }
}

.btnArea {
    grid-column: 2/3;
}

.grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 45% 10% 45%;
    @media (min-width: 320px) and (max-width: 991px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .tableContainer{
            margin: 0;
            width: 90%;
        }
        .btnArea{
            gap: 1rem;
            height: 4rem;
            width: 4rem;
            button > svg{
                rotate: 90deg;
            }
        }
    }
}

.tableHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;
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
    background-color: hsl(206deg 37% 14% / 91%);
}

.tableBody {
    max-height: 25rem;
    height: auto;
    overflow-y: auto;
    border: 1px solid white;
    background-color: hsla(206deg, 29%, 17%, 0.66);
    border-top: none;
}

button {
    width: 100%;
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    border-color: rgba(255, 255, 255, 0.7);
    border-radius: 7px;
    outline: none;
    overflow: hidden;
    box-sizing: border-box;
    transition: color 0.5s ease, border 0.5s ease;

    &:hover {
        transition: color 0.5s ease, border 0.5s ease;
        border-color: white;
        color: white;

        .arrow {
            transition: color 0.75s ease;
            color: rgba(245, 245, 245, 0.3);
        }
    }

    &:active {
        border-color: #f8d7a2;

        .arrow {

            color: #e08f0e8e;
        }

        // color: #ebb35a
    }
}

.arrow {
    transition: color 0.75s ease;
    z-index: -2;
    font-size: 2rem;
    color: rgba(245, 245, 245, 0.438);
}

span {
    position: relative;
    top: -15px
}

.checkbox {
    top: -5px;
    position: relative;
}
</style>