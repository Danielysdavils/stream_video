<template>
  <div>
    <b-container class="component">
      <b-row class="component">
        <b-col>
          <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="start"
          class="pagination"
          >
          </b-pagination>
        </b-col>
        <b-col>
          <div class="filterDiv">
            <b-form inline class="filterTable">
                <h3 class="title">{{ translateTitle }}</h3>
                <b-form-input class="filterButton" v-model="filter" type="search" placeholder="Pesquise por..."></b-form-input>
            </b-form>
          </div>
        </b-col>
      </b-row>
     

    </b-container>
    <h5>Total de Registro : {{this.totalRows}}</h5>
    <div style="display: none">{{this.computedTotalRows}}</div>
    <b-table :busy="isBusy || computedBusyState" :per-page="perPage" :current-page="currentPage" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" :sort-compare="myCompare" id="my-table-add" ref="table" striped hover  sort-icon-left :fields="translateFields" :items="translateItens" :dark="dark"  borderless responsive="xs">
      <template #head(details)="data">
          {{ data.label = "" }}
      </template>

      <template #cell(details)="row">
        <div v-if="row.item.id != null">
          <b-button pill :id="row.item.id" variant="secondary" size="sm" @click="ShowDetails(row)">
            {{ row.detailsShowing ? $i18n.t('hide') : $i18n.t('show') }}
          </b-button>
        </div>  
        <div v-else-if="row.item.plate != null">
          <b-button pill :id="row.item.plate" variant="secondary" size="sm" @click="ShowDetails(row)">
            {{ row.detailsShowing ? $i18n.t('hide') : $i18n.t('show') }}
          </b-button>
        </div>
      </template>

      <template #row-details="row">
        <b-card bg-variant="dark" :id="row.item.id" align="left" class="card">
          <b-row class="mb-1">
            <component 
              class="component" 
              :addTable="true" 
              :row=row 
              :is="currentComponent" 
              :plate="row.item.plate" 
              :id="row.item.id" 
              :array="translateItens"
              @addAction="AddAction" 
              @removeAction="RemoveAction"
              @busyAction="BusyAction">
            </component>
          </b-row>
        </b-card>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>

    <b-button pill variant="primary" @click="moveToTop()" class="m-2 p-2">{{ $i18n.t('return to top') }}</b-button>

  </div>
</template>

<script scoped>

import {i18n} from '../../../lang/lang';
import LprRecordComponent from '../../lprRecord/LprRecordInfo.vue';


export default {
  components: {
    LprRecordComponent: LprRecordComponent,
  },

  props: {
    tabletitle: {
      type: String,
      default: '',
    },

    selectedComponent: {
      type: String,
      default: '',
    },

    fields: [],
    items: [],

    busyState: {
      type: Boolean,
      default: false,
    },

    enableBusyState: {
      type:Boolean,
      default: false,
    },
    
  },

  data() {
    return {
      refresh: true,
      currentComponent: this.selectedComponent,
      dark: true,
      translatedItens: [],
      filter: '',
      filterOn: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 200,
      isBusy: false,
    }
  },

  computed: {
    translateTitle(){
      var translatedTitle = i18n.t(this.tabletitle);
      return translatedTitle;
    },

    translateFields() {
      var translatedFields = [];
  
      this.fields.forEach((field) => {
        translatedFields.push({
          key: field.key,
          label: i18n.t(field.label),
          sortable: true,
        });             
      });

      translatedFields.push( 
      {
        key: "details",
        label: i18n.t('details'),
      });

 
      return translatedFields;
    },

    translateItens() {
      this.refresh;
      return this.items;
    },

    computedTotalRows() {
      this.totalRows = this.items.length;
      return this.items;
    },

    computedBusyState() {
      console.log(this.busyState);
      return this.busyState;
    }
  },

  mounted() {
    this.totalRows = this.items.length
  },


  methods: {
    moveToTop() {

      var delayInMilliseconds = 1000; 

      setTimeout(function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, delayInMilliseconds);

    },

    
    ShowDetails(row) {
      if(this.enableBusyState) {
        this.isBusy = true;
      } 
      
      this.currentComponent = this.selectedComponent;
      row.toggleDetails();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    myCompare(itemA, itemB, key) {
      console.log(key)
      if (key !== i18n.t('dateTime')) {
        // If field is not `date` we let b-table handle the sorting
        return false
      } else {
        // Convert the string formatted date to a number that can be compared
        // Get the values being compared from the items
        let a = itemA[key]
        let b = itemB[key]
        // Split them into an array of parts (dd, mm, and yyyy)
        a = a.split('/')
        b = b.split('/')
        // convert string parts to numbers
        a = (parseInt(a[2], 10) * 10000) + (parseInt(a[1], 10) * 100) + parseInt(a[0])
        b = (parseInt(b[2], 10) * 10000) + (parseInt(b[1], 10) * 100) + parseInt(b[0])
        // Return the comparison result
        return a - b
      }
    },

    RemoveAction(element) {
      this.translatedItens = this.translatedItens.filter(el => {
        if(el.id != null && el.id != undefined) {
          if(el.id != element.value.id) {
            return el;
          }
        }

        if(el.plate != null && el.plate != undefined) {
          if(el.plate != element.value.plate) {
            return el;
          }
        }
     
      });

      element.row.toggleDetails();
      this.refresh = !this.refresh;
      this.$root.$emit('bv::refresh::table', 'my-table');
      this.$refs.table.refresh();
    },

    
    AddAction(newElement) {

      console.log("newElement");
      console.log(newElement);

      if(!newElement.update) {
        this.items[this.items.length-1] = newElement.value;
        this.items.push(newElement.element);
      } else {

        this.items.forEach((element, index, array) => {

          if(element.id != null && element.id != undefined)
          {
            console.log(element);
            if(element.id === newElement.value.id) {
              array[index] = newElement.value;
            }
          }

          if(element.plate != null && element.plate != undefined)
          {
            if(element.plate === newElement.value.plate) {
              array[index] = newElement.value;
            }
          }
    
        })

      }

      this.$emit('update', { value: newElement.value, update: newElement.update, element: newElement.element});

      newElement.row.toggleDetails();
      this.refresh = !this.refresh;
      this.$root.$emit('bv::refresh::table', 'my-table');
      this.$refs.table.refresh();
    },

    
    BusyAction() {
      this.isBusy = false;
    },
  },

  created() {
    this.currentComponent = this.selectedComponent;
    this.totalRows = this.items.length
  }
}
</script>

<style scoped>

h5 {
  color: white;
  padding: 0 1em;
}

.card {
  border-radius: 10px;
}

.pagination {
  width: 100%;
  padding: 15px;
}

.component {
  width: 100%;
  background-color: initial;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  /* max-height: 600px !important; */
}

.filterDiv {
  width: 100%;
  padding: 5px;
}

.filter {
  width: 100%;
}

.filterTable {
  justify-content: end;
  margin-right: 1.5em;
  margin-bottom: 0.5em;
}

.filterButton {
  max-width: 170px;
  margin-left: 5%;
  margin-bottom: 1em;
}
</style>