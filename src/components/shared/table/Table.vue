<template>
  <div>
    <b-button pill variant="success" @click="move()" class="m-2 text-white">{{ $i18n.t('add') }}</b-button>
    <div class="filterDiv">
      <b-form inline class="filterTable">
        <h3 class="title">{{ translateTitle }}</h3>
        <b-form-input class="filterButton" v-model="filter" type="search" placeholder="Pesquise por..."></b-form-input>
      </b-form>
    </div>

    <b-table :busy="isBusy" :filter="filter" :filter-included-fields="filterOn" id="my-table" :style="rowBorder"
      ref="table" striped :fields="translateFields" :items="translateItens" :dark="dark" borderless responsive="xs">

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
            <component class="component" :addTable="false" :row=row :is="currentComponent" :plate="row.item.plate"
              :id="row.item.id" :array="translateItens" @addAction="AddAction" @removeAction="RemoveAction"
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



    <b-button pill variant="primary" @click="moveToTop()" class="m-2 p-2 text-white">{{ $i18n.t('return to top')
    }}</b-button>
  </div>
</template>

<script>

import { i18n } from '../../../lang/lang';
import ScheduleComponent from '../../schedule/ScheduleInfo.vue';
import ClassComponent from '../../class/ClassInfo.vue';
import EquipmentComponent from '../../equipment/EquipmentInfo.vue';
import GroupComponent from '../../group/GroupInfo.vue';
import DVCComponent from '../../dvc/DVCInfo.vue';
import PenitentiaryComponent from '../../penitentiary/PenitentiaryInfo.vue';
import BlockComponent from '../../block/BlockInfo.vue';
import GalleryComponent from '../../gallery/GalleryInfo.vue';
import CellComponent from '../../cell/CellInfo.vue'
import StudentComponent from '../../student/StudentInfo.vue';
import SessionComponent from '../../session/SessionInfo.vue';
import TypeComponent from '../../type/TypeInfo.vue';
import CourseComponent from '../../course/CourseInfo.vue';
import CurriculumCourseComponent from '../../curriculumCourse/CurriculumCourseInfo.vue';
import OriginComponent from '../../origin/OriginInfo.vue';
import LprComponent from '../../lpr/LprInfo.vue';
import RestrictedPlatesComponent from '../../restrictedPlates/RestrictedPlatesInfo.vue';
import ServerComponent from '../../server/ServerInfo.vue';
import RecordComponent from '../../record/RecordInfo.vue';
import LprRecordComponent from '../../lprRecord/LprRecordInfo.vue';
import TelemetryComponent from '../../telemetry/TelemetryInfo.vue';
import VehicleComponent from '../../vehicle/VehicleInfo.vue';
import VehicleModelComponent from '../../vehicleModel/VehicleModelInfo.vue';
import VisitorComponent from '../../visitor/VisitorInfo.vue';
import PermanentComponent from '../../permanent/PermanentInfo.vue';


export default {


  components: {
    ScheduleComponent: ScheduleComponent,
    ClassComponent: ClassComponent,
    EquipmentComponent: EquipmentComponent,
    GroupComponent: GroupComponent,
    DVCComponent: DVCComponent,
    PenitentiaryComponent: PenitentiaryComponent,
    BlockComponent: BlockComponent,
    GalleryComponent: GalleryComponent,
    CellComponent: CellComponent,
    StudentComponent: StudentComponent,
    SessionComponent: SessionComponent,
    TypeComponent: TypeComponent,
    CourseComponent: CourseComponent,
    CurriculumCourseComponent: CurriculumCourseComponent,
    OriginComponent: OriginComponent,
    LprComponent: LprComponent,
    RestrictedPlatesComponent: RestrictedPlatesComponent,
    ServerComponent: ServerComponent,
    RecordComponent, RecordComponent,
    LprRecordComponent: LprRecordComponent,
    TelemetryComponent: TelemetryComponent,
    VehicleComponent: VehicleComponent,
    VehicleModelComponent: VehicleModelComponent,
    VisitorComponent: VisitorComponent,
    PermanentComponent: PermanentComponent,
  },

  props: {
    tabletitle: {
      type: String,
      default: '',
    },

    fields: [],
    items: [],

    selectedComponent: {
      type: String,
      default: '',
    },

    enableBusyState: {
      type: Boolean,
      default: false,
    },

    highlightBorder: {
      type: Boolean,
      default: true,
    },

  },

  data() {
    return {
      refresh: true,
      countDown: 3,
      currentComponent: this.selectedComponent,
      dark: true,
      translatedItens: [],
      filter: '',
      filterOn: [],
      isBusy: false,
    }
  },

  computed: {
    translateTitle() {
      var translatedTitle = i18n.t(this.tabletitle);
      return translatedTitle;
    },

    translateFields() {
      var translatedFields = [];
      this.fields.forEach((field) => {
        translatedFields.push({
          key: field.key,
          label: i18n.t(field.label),
          sortable: true
        });
      });

      translatedFields.push("details")
      return translatedFields;
    },

    translateItens() {
      this.refresh;
      return this.translatedItens;
    },

    rowBorder() {
      if (this.highlightBorder) return { "--row-border": "1px solid #009150" }
      else return { "--row-border": "none" }
    }
  },

  mounted() {
    this.totalRows = this.items.length
  },

  methods: {
    move() {
      if (document.getElementById("0") != null) {
        document.getElementById("0").click();
      }
      else if (document.getElementById("-") != null) {
        document.getElementById("-").click();
      }

      var delayInMilliseconds = 1000; //1 second

      setTimeout(function () {
        window.scrollTo({ top: document.body.scrollHeight || document.documentElement.scrollHeight, behavior: 'smooth' });
      }, delayInMilliseconds);

    },

    moveToTop() {

      var delayInMilliseconds = 1000; //1 second

      setTimeout(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, delayInMilliseconds);

    },

    ShowDetails(row) {

      if (this.enableBusyState) {
        this.isBusy = true;
      }
      this.currentComponent = this.selectedComponent;
      row.toggleDetails();
    },

    AddAction(newElement) {

      console.log("newElement");
      console.log(newElement);

      if (!newElement.update) {
        this.translatedItens[this.translatedItens.length - 1] = newElement.value;
        this.translatedItens.push(newElement.element);
      } else {

        this.translatedItens.forEach((element, index, array) => {

          if (element.id != null && element.id != undefined) {
            if (element.id === newElement.value.id) {
              array[index] = newElement.value;
            }
          }

          if (element.plate != null && element.plate != undefined) {
            if (element.plate === newElement.value.plate) {
              array[index] = newElement.value;
            }
          }

        })

      }

      this.$emit('update', { value: newElement.value, update: newElement.update, element: newElement.element });

      newElement.row.toggleDetails();
      this.refresh = !this.refresh;
      this.$root.$emit('bv::refresh::table', 'my-table');
      this.$refs.table.refresh();
    },

    RemoveAction(element) {
      console.warn(element)
      this.translatedItens = this.translatedItens.filter(el => {
        if (el.id != null && el.id != undefined) {
          if (el.id != element.value.id) {
            return el;
          }
        }

        if (el.plate != null && el.plate != undefined) {
          if (el.plate != element.value.plate) {
            return el;
          }
        }

      });

      element.row.toggleDetails();
      this.refresh = !this.refresh;
      this.$root.$emit('bv::refresh::table', 'my-table');
      this.$refs.table.refresh();
    },

    BusyAction() {
      this.isBusy = false;
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.translatedItens = this.items;
          this.countDown -= 1
          console.log(this.fields, this.items, this.translatedItens)
          this.countDownTimer()
        }, 1000)
      }
    }
  },

  created() {
    console.log();
    this.translatedItens = this.items;
    this.currentComponent = this.selectedComponent;
    this.countDownTimer();
  }
}
</script>

<style  scoped>
#my-table {
  table-layout: fixed;
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

<style lang="scss">
#my-table>tbody>tr:last-of-type {
  border: var(--row-border);

  // td:nth-child(n+2):nth-child(-n+4) {
  //   border: 4px solid #009150;
  //   display: none;
  // }

  // td:nth-child(5) {
  //   &::before {
  //     content: "Adicionar";
  //     text-transform: uppercase;
  //     font-weight: 600;
  //     letter-spacing: 0.5px;
  //   }
  // }
}

#my-table-add>tbody>tr:last-child>td:last-child>button {
  background: #009150;
  border-color: #009150;
}

#my-table {
  &:hover {
    background-color: #343a40;
  }
}
</style>