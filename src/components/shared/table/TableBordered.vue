<template>
    <div class="w-100" :key="tableKey" :id="tableId">

        <div class="w-100">
            <b-container class="container">
                <b-row>
                    <b-col v-if="btn">
                        <action-button v-th-disableLowPrivilegeBtn type="button" :title="$i18n.t('new')"
                            buttonStyle="outline-light" @buttonAction="toggleNew()"></action-button>
                    </b-col>
                    <b-col class="searchContainer">
                        <b-input-group class="search-group">
                            <b-input-group-prepend>
                                <b-input-group-text>
                                    <b-icon icon="search" />
                                </b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" v-model="filter"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>

        </div>

        <transition name="fade">
            <div class="w-100 new-item-container" v-if="computedOpenTable">
                <div class="newItem details-container">
                    <span>
                        <h1 class="w-100 text-center">{{ $i18n.t("new") }}</h1>
                        <component class="text-center" :id="0" :is="componentDetails" :parameter="parameter"
                            @addElement="addElement" @updateElement="updateElement" @removeElement="removeElement" />
                    </span>
                </div>
                <hr>
            </div>
        </transition>


        <b-table striped primary-key="id" thead-class="green-bg bg-dark text-white" style="text-align: center"
            :responsive="!showStacked" :stacked="showStacked"  :hover="hover" :items="computedItems" :fields="computedFields" :filter="filter" :busy="isBusy"
            @row-hovered="onRowHover" @row-unhovered="onRowUnhover" @row-dblclicked="onRowDoubleClick"
            :tbody-transition-props="transProps">
            <template #cell(details)="row">
                <b-button :id="row.item.id" class="showDetailsButton" variant="secondary" size="sm"
                    @click="toggleFirstDetails(row)">
                    {{ toggleRowButtonLabel(row) }}
                </b-button>
                <b-button v-if="secondDetails" :id="row.item.id" variant="outline-light" size="sm"
                    @click="toggleSecondDetails(row)" class="ml-1">
                    {{ $i18n.t(secondDetailsText) }}
                </b-button>
            </template>

            <template #cell(status)="data">
                <div class="d-flex justify-content-center w-100" v-b-tooltip.hover
                    :title="statusTitle(data.item.status, data.item.quant)">
                    <div v-if="data.item.status === 0" class="status-ball none-active"></div>
                    <div v-else-if="data.item.status === data.item.quant && data.item.quant > 0"
                        class="status-ball all-active"></div>
                    <div v-else-if="hasItems(data.item.status)" class="status-ball some-active"></div>
                    <div v-else class="status-ball no-items"></div>
                </div>
            </template>
            <template #cell(goToDashboard)="row">
                <div class="w-100 d-flex justify-content-center">
                    <b-button class="goToDashboardButton" variant="outline-light" size="sm" @click="redirectToRoute(row)">
                        {{ $i18n.t("go") }} <b-icon-arrow-right />
                    </b-button>
                </div>
            </template>
            <template #cell(operator)="data">
                {{$i18n.t(data.item.operator)}}
            </template>
            <!-- <template #cell(alarmsEnable)="data">
                <b-icon />
            </template> -->
            <template #cell(color)="data">
                <div class="w-100 h-100"
                    :style="`background-color: ${data.item.color}; color: ${data.item.color} !important;`">
                    {{ data.item.color }}</div>
            </template>
            <template #row-details="row">
                <b-row>
                    <div class="w-100 details-container">
                        <component class="text-center" :is="component" :parentId="parentId" :row=row :id="row.item.id"
                            :parameter="parameter" @addElement="addElement" @updateElement="updateElement"
                            @cancel="row.toggleDetails" @removeElement="removeElement" @loading="loading"
                            @loaded="loaded" />
                    </div>
                </b-row>
            </template>
        </b-table>
    </div>
</template>

<script>
import { i18n } from '../../../lang/lang';
import ActionButton from '../button/TelemetryButton'

export default {
    components: {
        ActionButton,
    },
    props: {
        parentId: {
            type: Number,
            default: 0,
            required: false,
        },
        tableId: {
            type: String,
            default: "table",
        },
        btn: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: "",
            required: false
        },
        hover: {
            type: Boolean,
            required: false,
            default: false,
        },
        items: {
            type: Array,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        componentDetails: {
            type: String,
            required: true
        },
        parameter: {
            type: Object,
            required: false,
        },
        route: {
            type: String,
            required: false,
            default: 'dashboard',
        },
        secondDetails: {
            type: Boolean,
            required: false,
            default: false,
        },
        secondDetailsText: {
            type: String,
            required: false,
            default: "show",
        },
        secondComponentDetails: {
            type: String,
            required: false
        },

    },

    data() {
        return {
            filter: "",
            localItems: [],
            newElement: false,
            component: "",
            detailsIds: [],
            tableKey: 0,
            transProps: {
                name: 'fade',
                mode: 'out-in'
            },
            showFirtsDetails: false,
            showSecondDatails: false,
            isBusy: false,
            showStacked: false,
        }
    },
    methods: {

        onRowHover(item, index) {
            this.$set(item, '_rowVariant', 'info')
        },

        onRowUnhover(item, index) {
            this.$delete(item, '_rowVariant')
        },

        onRowDoubleClick(item, index) {
            const id = item.id
            this.$emit('onRowDoubleClick', item);
            //this.$router.push(`/${this.route}/${id}`);
        },

        redirectToRoute(row) {
            const id = row.item.id
            this.$router.push(`/${this.route}/${id}`);
        },

        toggleNew() {
            this.newElement = !this.newElement;
        },

        toggleFirstDetails(row) {
            console.log(row.detailsShowing)
            this.component = this.componentDetails;
            row.toggleDetails();
            if (row.detailsShowing)
                this.detailsIds = this.detailsIds.filter(el => { return el != row.item.id })
            else
                this.detailsIds.push(row.item.id)
        },
        toggleRowButtonLabel(row) {
            return row.detailsShowing ? this.$i18n.t("hide") : this.$i18n.t("show")
        },

        toggleSecondDetails(row) {
            this.component = this.secondComponentDetails;
            row.toggleDetails();
            if (row.detailsShowing)
                this.detailsIds = this.detailsIds.filter(el => { return el != row.item.id })
            else
                this.detailsIds.push(row.item.id)
        },

        addElement(element) {
            this.localItems.push(element.value);

            setTimeout(() => this.toggleNew(element.row), 1000);

            this.$emit('addAction', element);
            this.tableKey += 1;
        },

        updateElement(element) {
            console.log(element);
            this.localItems.forEach((el, index, array) => {
                if (el.id != null && el.id != undefined) {
                    if (el.id === element.value.id) {
                        array[index] = element.value;
                    }
                }
            })
            setTimeout(() => {
                this.toggleFirstDetails(element.row)
                this.$emit('addAction', element);
                this.tableKey += 1;
            }, 1000);


        },

        removeElement(element) {
            console.log(element);
            this.toggleFirstDetails(element.row)
            this.localItems = this.localItems.filter(el => {
                if (el.id != null && el.id != undefined) {
                    if (el.id != element.value.id) {
                        return el;
                    }
                }
            });
            setTimeout(() => {
                this.$emit('removeAction', element);
                this.tableKey += 1;
            }, 1000);

        },


        statusTitle(status, quant) {
            const activeAmount = status
            const totalAmount = quant
            if (!this.hasItems(status, quant)) {
                if (this.componentDetails == 'device-info') return this.$i18n.t("noVariablesInDevice")
                if (this.componentDetails == 'dashboard-info') return this.$i18n.t("noVariablesInDashboard")
                else return this.$i18n.t("variableNotActive")
            }

            if (this.componentDetails == "variable-info") {
                return status ? this.$i18n.t("variableActive") : this.$i18n.t("variableNotActive")
            }


            return this.$i18n.t("activeVariablesCount", {
                activeQuant: activeAmount,
                totalQuant: totalAmount,
                element: i18n.t(this.title)
            })
        },

        hasItems(status) {
            return !isNaN(status)
        },

        loading() {
            this.isBusy = true;
        },

        loaded() {
            this.isBusy = false;
        },
        windowResize(){
            const screenWidth = window.innerWidth
            this.showStacked = screenWidth >= 320 && screenWidth <= 991
        }

    },


    computed: {
        computedOpenTable() {
            return this.newElement;
        },

        computedItems() {
            return this.localItems;
        },

        computedFields() {
            var translatedFields = [];
            this.fields.forEach((field) => {
                translatedFields.push({
                    key: field.key,
                    label: i18n.t(field.label),
                    sortable: !(field.key == 'status' || field.key == 'details' || field.key == "goToDashboard")
                });
            });
            console.log(translatedFields)
            return translatedFields;
        },
    },

    created() {
        this.counter = 0

        this.interval = setInterval(() => {
            if (this.detailsIds.length == 0) {
                if (this.localItems.length == 0) {
                    this.localItems = this.items;
                } else {

                    var itemsMap = this.items.map(a => a.id);
                    var localItemsMap = this.localItems.map(a => a.id);
                    //console.log(itemsMap);
                    //console.log(localItemsMap);


                    if (this.localItems.length == this.items.length) {
                        itemsMap.forEach(el => {
                            if (!localItemsMap.find(a => a == el)) {
                                this.localItems = [];
                            }
                        })
                    }
                    else {
                        if (this.items.length > this.localItems.length) {
                            this.items.forEach(el => {
                                if (!localItemsMap.find(a => a == el.id)) {
                                    this.localItems.push(el)
                                }
                            })
                        }

                        if (this.items.length < this.localItems.length) {
                            var itemsToRemove = []
                            this.localItems.forEach((el, index) => {
                                if (!itemsMap.find(a => a == el.id))
                                    itemsToRemove.push(index);
                            })
                            var removeCounter = 0
                            itemsToRemove.forEach(element => {
                                this.localItems.splice(element - removeCounter, 1);
                                removeCounter += 1;
                            });

                        }
                    }

                }
            }
        }, 1000)
        this.windowResize()
        window.addEventListener("resize", e => {
			this.windowResize()
		});
    },

    beforeDestroy() {
        clearInterval(this.interval)
    },


}
</script>

<style lang="scss">
table{
    overflow: hidden;
}
table.b-table-stacked > tbody{

    & > tr > td{
    padding: 0;
    display: flex !important;
    justify-content: center;
    align-items: center;

        & > div{
            padding: 1rem !important;
            border-left: 2px solid white;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
    & > tr.b-table-details > td{
        & > div{
            padding: 0rem !important;
            border-left: none !important;
            background-color: transparent;
        }
    }
}
@media (min-width: 320px) and (max-width: 991px){
    .searchContainer{
        display: flex;
        justify-content: center;
        & > div[role="group"]{
            margin: 0 !important;
            width: 100%;
            margin-bottom: 1rem !important;
        }
    }
}

.fade-move {
    transition: transform .5s;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

/*
    .new-enter-active, .new-leave-active {
        transition: all 1s;
    }


    .new-enter,
    .new-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

*/
.showDetailsButton {
    width: 5rem;
}

.table {
    margin-bottom: 0;
}

.container {
    max-width: 100% !important;
    width: 100%;
    height: 100%;
}

hr {
    width: 100%;
    margin: 0;
    padding: 0;
    background: #acacac;
    height: 2px;
    margin-bottom: 2rem;
}

p {
    opacity: 0.5;
}

tbody {
    color: white
}

.table thead th {
    background: white;
    color: black;
}
tr.table-success, tr.table-success > td{
    background: #38ba953d !important;
}

.search-group {
    right: 0px;
    max-width: 30% !important;
    margin-left: 70% !important;
    min-width: 200px;
    margin: 12px auto;
}

.search-group>.form-control {
    justify-content: flex-end !important;
    border: none;
    color: white;
    background-color: rgba(255, 255, 255, 0.2);

    // border: 0.1px solid rgb(217 217 217 / 89%);
    &:active,
    &:focus {
        color: white;
        background-color: rgba(255, 255, 255, 0.2);
        ;
    }
}

.input-group-text {
    border: none !important;
    background-color: rgb(26 26 26 / 21%) !important;
    color: white !important;
}

.details-container {
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

    background-color: hsla(206, 29%, 17%, 0.66);
}

.new-item-container:has(.detailsContainer) {
    padding: 1rem;
    border-top: 1px solid white
}

.new-item {
    transform: scaleY(0);
    transition: transform 0.25s ease-in-out;
    transform-origin: top;
    height: 0;

}

.new-item__details-container {
    height: auto;
    transform: scaleY(1);
    transition: transform 0.25s ease-in-out;
    transform-origin: top;
    outline: 1px solid limegreen;
    outline-offset: -6px;

}

.status-ball {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: 2px solid #666d73;
    opacity: 1;
    animation: blink 0.75s ease-in-out alternate-reverse infinite;

    &.none-active {
        background: #dc3545;
    }

    &.all-active {
        background: #8BC34A;
    }

    &.some-active {
        background: #FFEB3B;
    }

    &.no-items {
        background: #424242;
        animation: none
    }
}

.goToDashboardButton {
    // w-75 d-flex justify-content-center align-items-center
    width: 75%;
    text-align: center;
}

@keyframes blink {
    0% {
        opacity: 0.625;
    }

    100% {
        opacity: 1;
    }
}
</style>