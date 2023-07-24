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
      <b-table :busy="isBusy" :per-page="perPage" :current-page="currentPage" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" id="my-table-add" ref="table" striped hover :fields="translateFields" :items="translateItens" :dark="dark" borderless responsive="xs">
        <template #head(details)="data">
            {{ data.label = "" }}
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

  
  
  export default {
    components: {

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
  
      enableBusyState: {
        type:Boolean,
        default: false,
      },
    },
  
    data() {
      return {
        refresh: true,
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
  
        translatedFields.push("details")
        return translatedFields;
      },
  
      translateItens() {
        this.refresh;
        return this.items;
      },
  
      computedTotalRows() {
        console.log(this.items);
        this.totalRows = this.items.length;
        return this.items;
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
  
      

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
  
      BusyAction() {
        this.isBusy = false;
      },
    },
  
    created() {
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