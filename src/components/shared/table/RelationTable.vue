<template>
    <b-container fluid>
        <b-row>
            <b-col cols="5">
                <b-form inline class="filter">
                    <h5 class="title">{{ $i18n.t(addTableName) }}</h5>
                    <b-form-input class="filterButton" v-model="filterAvailableData" type="search"
                        placeholder="Pesquise por..."></b-form-input>
                </b-form>
            </b-col>
            <b-col align-self="center" cols="md">

            </b-col>
            <b-col cols="md">
                <b-form inline class="filter">
                    <h5 class="title">{{ $i18n.t(insertedTableName) }}</h5>
                    <b-form-input class="filterButton" v-model="filterInsertedData" type="search"
                        placeholder="Pesquise por..."></b-form-input>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="md">
                <b-table :filter="filterAvailableData" :filter-included-fields="filterOnAvailableData" ref="tableAvailable"
                    sticky-header="600px" :no-border-collapse="noCollapse" :items="avaiableElements" :fields="fields"
                    :dark="dark" class="mr-sm-2 mb-sm-0" table-variant="dark" head-row-variant="secondary" hover striped
                    sort-icon-left>

                    <template #head(details)>
                        <b-form-checkbox v-model="allAvailableStatus" @change="changeAllAvaiable"></b-form-checkbox>
                    </template>
                    <template #cell(details)="row">
                        <b-form-checkbox v-model="elementsToAdd[row.index]" :value="row.item.id"
                            unchecked-value=null></b-form-checkbox>
                    </template>
                </b-table>
            </b-col>
            <b-col align-self="center" cols="xs">
                <myButton type="button" :title="$i18n.t('update')" buttonStyle="info" @buttonAction="update()"></myButton>
            </b-col>
            <b-col cols="md">
                <b-table :filter="filterInsertedData" :filter-included-fields="filterOnInsertedData" ref="tableInserted"
                    sticky-header="600px" :no-border-collapse="noCollapse" :items="insertedElements" :fields="fields"
                    :dark="dark" class="table mb-2 mr-sm-2 mb-sm-0" table-variant="dark" head-row-variant="secondary" hover
                    striped sort-icon-left>

                    <template #head(details)>
                        <b-form-checkbox v-model="allInsertedStatus" @change="changeAllInsert"></b-form-checkbox>
                    </template>
                    <template #cell(details)="row">
                        <b-form-checkbox v-model="elementsToRemove[row.index]" :value="row.item.id"
                            unchecked-value=null></b-form-checkbox>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import Button from "../../shared/button/Button.vue";

export default {
    components: {
        myButton: Button,
    },

    props: {
        initAvailableElements: [],
        initInsertedElements: [],
        addTableName: {
            type: String,
            default: ''
        },
        insertedTableName: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            insertedElements: this.initAvailableElements,
            availableElements: this.initInsertedElements,
            elementsToAdd: [],
            elementsToRemove: [],
            allAvailableStatus: false,
            allInsertedStatus: false,
            filterAvailableData: '',
            filterOnAvailableData: ["id", "name"],
            filterInsertedData: '',
            filterOnInsertedData: ["id", "name"],
            dark: true,
            sortBy: 'id',
            fields: [
                {
                    key: "id",
                    label: "Id",
                    sortable: true
                },
                {
                    key: "name",
                    label: "Nome",
                    sortable: false
                },
                {
                    key: "details",
                    label: "Details",
                    sortable: false
                }
            ],
            noCollapse: false,
            countDown: 3,
        };
    },

    methods: {

        changeAllAvaiable(checked) {
            console.log(checked);

            for (var counter = 0; counter < this.availableElements.length; counter++) {
                if (checked) {
                    this.elementsToAdd[counter] = this.availableElements[counter].id;
                } else {
                    this.elementsToAdd[counter] = null;
                }
            }

            console.log(this.elementsToAdd);
            this.$refs.tableAvailable.refresh();
        },

        changeAllInsert(checked) {
            console.log(checked);

            for (var counter = 0; counter < this.insertedElements.length; counter++) {
                if (checked) {
                    this.elementsToRemove[counter] = this.insertedElements[counter].id;
                } else {
                    this.elementsToRemove[counter] = null;
                }
            }

            console.log(this.elementsToRemove);
            this.$refs.tableInserted.refresh();
        },

        update() {
            var add = [];
            var rmv = [];

            for (var addCounter = 0; addCounter < this.elementsToAdd.length; addCounter++) {

                this.avaiableElements.forEach((el => {
                    if (el.id === this.elementsToAdd[addCounter]) {
                        this.insertedElements.push(el);
                        add.push(el);
                    }
                }))
            }

            this.avaiableElements = this.avaiableElements.filter(el => {
                return !add.includes(el);
            })

            for (var removeCounter = 0; removeCounter < this.elementsToRemove.length; removeCounter++) {

                this.insertedElements.forEach((el => {
                    if (el.id === this.elementsToRemove[removeCounter]) {
                        this.avaiableElements.push(el);
                        rmv.push(el);
                    }
                }))

            }

            this.insertedElements = this.insertedElements.filter(el => {
                return !rmv.includes(el);
            })

            this.elementsToAdd = [];
            this.elementsToRemove = [];
            this.allAvailableStatus = false;
            this.allInsertedStatus = false;

            this.$emit('updateRelation', { elements: this.insertedElements });
        },

        countDownTimer() {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.insertedElements = this.initInsertedElements,
                        this.avaiableElements = this.initAvaiableElements,
                        console.warn(this.insertedElements)
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        }
    },


    created() {
        this.countDownTimer();
    }
}

</script >

<style lang="scss" scoped>
.title {
    padding: 10px;
}

.table {
    height: 100%;
}

.filter {
    width: 99%;
    justify-content: space-between;
}

.filterButton {
    max-width: 170px;
    padding: 10px;
    margin-bottom: 5px;
    float: right;
}

@media(min-width: 320px) and (max-width: 768px) {
    .filter {
        display: none;
    }

    .relationTable>.row:last-child {
        flex-direction: column;
    }
}
</style>