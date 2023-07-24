<template>
  <div id="sidebar" :style="sidebar">
    <b-sidebar id="sidebar-variant" text-variant="secondary" no-header bg-variant="transparent" shadow="sm"
      @change="changeSideBar" @hidden="hideSideBar" @shown="showSideBar">
      <b-nav vertical class="w-100">
        <div class="w-100 mb-1">
          <b-nav-item class="colapsable d-flex justify-content-between align-items-center" @click="toggleDashboard">
            <b-icon-layout-wtf font-scale="0.9" />
            {{ dashboardTitle }}
            <b-icon-triangle v-if="hasDashboards" font-scale="0.6" class="arrowDropdown" :style="dArrowRotation" />
          </b-nav-item>
          <b-collapse id="collapse-dashboard">
            <b-nav-item exact exact-active-class="active" v-for="route in routes" v-if="route.menu"
              @click.stop="redirectDashboard(`/dashboard/${route.params.id}`)" :key="$router.options.routes.path">
              {{ $i18n.t(route.name) }}
            </b-nav-item>
          </b-collapse>

          <b-nav-item to="/Map" exact exact-active-class="active">
            <b-icon-map font-scale="0.9" />
            {{ $i18n.t("map") }}
          </b-nav-item>
          <b-nav-item to="/history" exact exact-active-class="active">
            <b-icon-clock font-scale="0.9" />
            {{ $i18n.t("History") }}
          </b-nav-item>


          <b-nav-item to="/presentation" v-if="!isMobile" exact exact-active-class="active">
            <b-iconstack shift-v="-3">
              <b-icon-back font-scale="0.4" shift-h="-4" shift-v="4" />
              <b-icon-back font-scale="0.4" shift-h="4" shift-v="-4" />
            </b-iconstack>
            <i style="margin-left:-6px">
              {{ $i18n.t("presentation") }}
            </i>
          </b-nav-item>
        </div>
        <div class="w-100 mb-1" v-if="!isUserSecundary && !isMobile">
          <b-nav-item class="colapsable d-flex justify-content-between align-items-center" style="width: 40%"
            @click="toggleConfig" v-b-toggle.collapse-config>
            <b-icon-gear-wide-connected font-scale="0.9" />
            {{ $i18n.t("configuration") }}
            <b-icon-triangle font-scale="0.6" class="arrowDropdown" :style="arrowRotation" />
          </b-nav-item>
          <b-collapse id="collapse-config">

            <b-nav-item to="/dashboard" exact exact-active-class="active">
              <b-icon-grid1x2-fill font-scale="0.8" />
              {{ $i18n.t('dashboards') }}
            </b-nav-item>

            <b-nav-item to="/device" exact exact-active-class="active">
              <b-icon-hdd-network-fill font-scale="0.9" />
              {{ $i18n.t("devices") }}
            </b-nav-item>

            <b-nav-item to="/variable" exact exact-active-class="active">
              <b-iconstack>
                <b-icon-soundwave font-scale="0.6" shift-h="-8" shift-v="0" />
                <b-icon-soundwave font-scale="0.6" shift-h="4" shift-v="0" />
              </b-iconstack>
              {{ $i18n.t("variables") }}
            </b-nav-item>

            <b-nav-item to="/group" exact exact-active-class="active">
              <b-iconstack shift-v="-3">
                <b-icon-power font-scale="0.4" shift-h="-8" shift-v="7" />
                <b-icon-speedometer font-scale="0.4" shift-h="0" shift-v="-7" />
                <b-icon-speedometer2 font-scale="0.4" shift-h="8" shift-v="7" />
                <b-icon-thermometer-half font-scale="0.4" shift-h="14" shift-v="-7" />
              </b-iconstack>
              {{ $i18n.t("groups") }}
            </b-nav-item>
            <b-nav-item to="/display" exact exact-active-class="active"><b-icon-display />{{ $i18n.t("displays")
            }}</b-nav-item>
            <b-nav-item to="/measurer" exact exact-active-class="active"><b-icon-speedometer2 />{{ $i18n.t("measurers")
            }}</b-nav-item>
            <b-nav-item to="/alarm" exact exact-active-class="active">
              <b-icon-bell font-scale="0.9" />
              {{ $i18n.t("alarms") }}
            </b-nav-item>
            <b-nav-item to="/action" exact exact-active-class="active">
              <b-icon-lightning font-scale="0.9" />
              {{ $i18n.t("actions") }}
            </b-nav-item>
            <b-nav-item to="/schedule" exact exact-active-class="active">
              <b-icon-calendar3 font-scale="0.9" />
              {{ $i18n.t("schedules") }}
            </b-nav-item>
            <b-nav-item to="/recipient" exact exact-active-class="active">
              <b-icon-mailbox font-scale="0.9" />
              {{ $i18n.t("recipients") }}
            </b-nav-item>
            <b-nav-item to="/recipientGroup" exact exact-active-class="active">
              <b-iconstack shift-v="-3">
                <b-icon-person-fill font-scale="0.5" shift-h="-8" shift-v="-3" style="opacity: 0.66"/>
                <b-icon-person-fill font-scale="0.5"shift-h="11" shift-v="-3" style="opacity: 0.66"/>
                <b-icon-person-fill font-scale="0.6"/>
              </b-iconstack>
              {{$i18n.t('teams')}}
            </b-nav-item>
            <b-nav-item to="/user" exact exact-active-class="active">
              <b-icon-person-circle font-scale="0.9" />
              {{ $i18n.t("users") }}
            </b-nav-item>
            <b-nav-item v-if="$session.get('logged_id')" to="/serialNumber" exact exact-active-class="active">
              <b-icon-upc font-scale="0.9" />
              {{ $i18n.t("serialNumbers") }}
            </b-nav-item>

          </b-collapse>
        </div>
      </b-nav>
    </b-sidebar>
    <!-- <router-view class="w-100"></router-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebar: {
        width: '6rem',
        bottom: 0,
        position: 'fixed',
        top: '3.25rem',
        'z-index': 1010,
        left: 0,
        display: 'flex',
        'margin-left': '-20rem',
      },
      configIsOpen: false,
      dashboardIsOpen: false,
    }
  },
  computed: {
    isUserSecundary() {
      return this.$session.get("user").privilege == 2
    },
    isMobile(){
      return this.$session.get("isMobile")
    },
    dashboardTitle() {
      return this.isUserSecundary ? this.$i18n.t('dashboards') : this.$i18n.t("allDashboards")
    },
    routes() {
      return this.$router.options.routes;
    },
    hasDashboards() {
      return this.routes.filter(item => item.path == '/dashboard/:id').length > 0
    },
    arrowRotation() {
      return this.configIsOpen ? { "--rotate": "0deg" } : { "--rotate": "180deg" }
    },

    dArrowRotation() {
      return this.dashboardIsOpen ? { "--rotate": "0deg" } : { "--rotate": "180deg" }
    }
  },
  methods: {
    /** Navega dessa forma para poder fazer com que o dashboard se descarregue e carrgue novamente
     * Assim não repete o dashboard
     */
    async redirectDashboard(route) {
      this.$router.push('/dashboard').catch(err => { }); // se entrar no erro quer dizer que está no /dashboard
      await this.$nextTick()
      this.$router.push(route);
    },
    toggleConfig() {
      this.configIsOpen = !this.configIsOpen
    },

    toggleDashboard() {
      if (this.hasDashboards) {
        this.$root.$emit('bv::toggle::collapse', 'collapse-dashboard')
        this.dashboardIsOpen = !this.dashboardIsOpen
      } else {
        this.$router.push('/dashboard').catch(err => { }); // se entrar no erro quer dizer que está no /dashboard
      }
    },

    changeSideBar(visible) {
      if (visible) {
        this.$emit('showSideBar');
      }
      else {
        this.$emit('hideSideBar');
      }
    },

    hideSideBar() {
      this.sidebar = {
        width: '13rem',
        bottom: 0,
        position: 'fixed',
        top: '3.25rem',
        left: 0,
        display: 'flex',
        opacity: 0,
        // transition: '0.5s',
        'margin-left': '-20rem',
      };
    },

    showSideBar() {
      this.sidebar = {
        width: '13rem',
        bottom: 0,
        position: 'fixed',
        top: '3.25rem',
        left: 0,
        display: 'flex',
        opacity: 1,
        transition: '0.2s',
        'margin-left': '0',
      };
    }
  },
  created() {
    this.hideSideBar()
  },
  beforeUnmount() {
    this.hideSideBar()
  }
}
</script>

<style lang="scss" scoped>
small {
  font-size: 0.75rem;
  color: white;
  opacity: 0.8;
}

.colapsable {
  font-weight: bolder;
}

#sidebar {
  padding-bottom: 3rem;
}

.nav-dashboard-link {
  padding: 0.5rem 0rem;
  color: aliceblue;
  border: 1px solid transparent;
  display: flex;
  gap: 1rem;
  font-size: 1.15rem;
  opacity: 0.75;
  transition: opacity 0.4s ease;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: white;
    transition: opacity 0.4s ease;
  }
}

.nav-item a {
  padding-left: 0;
  padding-right: 0;
  color: aliceblue;
  border: 1px solid transparent;
  display: flex;
  gap: 1rem;
  align-items: center;
  // background-color: rgba(255, 255, 255, .03);
}

.nav-item a::hover {
  text-decoration: underline;
  color: burlywood;
}

.nav-item {
  font-size: 1.15rem;
  opacity: 0.75;
  color: initial;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 1;
    color: white;
    transition: opacity 0.4s ease;

  }
}

.arrowDropdown {
  font-size: 0.6rem;
  transform: rotate(var(--rotate));
  transition: transform 0.5s ease-in-out;
}

#collapse-dashboard,
#collapse-config {
  margin-left: 1rem
}
</style>
<style lang="scss" >
@media (min-width: 320px) and (max-width: 991px){
    #sidebar{
        z-index: 9999999999;
    }
    .b-sidebar{
        width: auto !important;
        // z-index: 9999;
        height: 100vh;
        left: -20px !important;
        padding-right: 2rem;
        top: 1rem;
        background-color: rgb(31, 42, 57) !important;
    }
    div#sidebar-variant{
      width: auto !important;
    }
}
div#sidebar-variant {
  margin: 4rem 1rem
}

.b-sidebar-body {
  padding-bottom: 5rem !important;
  direction: rtl;
  padding-left: 0.5rem;

  &::-webkit-scrollbar {
    width: 2px !important
  }

  ul {
    direction: ltr;
  }

}

.b-sidebar {
  width: 25% !important;
}
div#collapse-dashboard > li.nav-item > a.nav-link {
    overflow: hidden;
    max-width: 15ch;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>