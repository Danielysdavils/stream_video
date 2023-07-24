<template>
  <div>
    <b-container class="component">
      <b-row class="component">
        <b-col v-if="totalRows > perPage">
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

    <b-table :busy="isBusy" :per-page="perPage" :current-page="currentPage" :filter="filter" :filter-included-fields="filterOn" id="my-table-add" ref="table" striped hover :fields="translateFields" :items="translateItens" :dark="dark" borderless responsive="xs">
      <template #head(details)="data">
          {{ data.label = "" }}
      </template>
      <template #cell(details)="row">
        <b-button pill size="sm" @click="info(row, $event.target)" class="mr-1">
          {{ row.detailsShowing ? $i18n.t('hide') : $i18n.t('show') }}
        </b-button>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>

    <b-button pill variant="primary" @click="moveToTop()" class="m-2 p-2">{{ $i18n.t('return to top') }}</b-button>

    <b-modal 
      :lazy="true"
      body-bg-variant="dark"  
      button-size="lg" 
      header-class="header-class" 
      dialog-class="dialog-class"
      content-class="content-class"
      footer-class="footer-class"
      class="modal"
      id="componentModal"
      ok-only align="center"
      :title="modalTitle">
   
      <div v-if="selectedRow != null">
        <b-card bg-variant="dark" :id="selectedRow.item.id" align="left" class="card">
          <b-row class="mb-1">
            <component 
              class="component" 
              :row=selectedRow 
              :is="currentComponent" 
              :plate="selectedRow.item.plate" 
              :id="selectedRow.item.id" 
              :array="translateItens"
              @busyAction="BusyAction">
            </component>
          </b-row>
        </b-card>
      </div>
    </b-modal>


  </div>
</template>

<script>

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
    addButton: {
      type: Boolean,
      default: true,
    },
    addTable: {
      type: Boolean,
      default: true,
    },

   

    selectedComponent: {
      type: String,
      default: '',
    },

    perPage: {
      type: Number,
      default: 0,
    },

    enableBusyState: {
      type:Boolean,
      default: false,
    },

    fields: [],
    items: [],
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
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      selectedRow: null,
      modalTitle: '',
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
    }
  },

  mounted() {
    this.totalRows = this.items.length
  },

  methods: {
    info(row, button) {

      if(this.enableBusyState) {
        this.isBusy = true;
      }

      this.selectedRow = row;
      console.info(this.selectedRow);
      if(row.item.name) {
        this.modalTitle = row.item.name;
      } 
      else if (row.item.title){
        this.modalTitle = row.item.title;
      } 
      else if (row.item.plate){
        this.modalTitle = row.item.plate;
      } 

      console.log(this.modalTitle);
      
      this.$root.$emit('bv::show::modal', 'componentModal', button)
    },

    moveToTop() {

      var delayInMilliseconds = 1000; 

      setTimeout(function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, delayInMilliseconds);

    },

    
    BusyAction() {
      this.isBusy = false;
     
    },

  },

  created() {
    this.currentComponent = this.selectedComponent;
  }
}
</script>

<style>

.modal {
  width: 100% !important;
  height: auto !important;
  max-width: 80% !important;
  max-height: 80% !important;
  margin-top: 20px;
  margin-right: 10%;
  margin-left: 10%;
  background-color:#343a40 !important;
  color: white !important;
  border: 0px !important;
  padding-right: 0px !important;
  border-radius: 1.3rem;
}


.dialog-class {
  max-width: 100% !important;
}

.header-class {
  background-color:#343a40;
  border: 0px;
  font-size: 2.25rem;
}

.content-class {
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.footer-class {
  background-color:#343a40;
  display: none;
  border: 0px;
}

.card {
  border-radius: 10px;
  border: 0px !important;
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
  min-width: 200px;
  max-width: 270px;
  margin-left: 5%;
  margin-bottom: 1em;
}

</style>