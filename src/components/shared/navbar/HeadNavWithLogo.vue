<template>
  <div>
    <b-navbar toogleable="lg" type="dark" variant="dark" class="p-2">
      <b-navbar-nav small>
        <b-button v-b-toggle.sidebar-variant squared variant="transparent" class="p-1">
          <b-icon-list font-scale="1.5" variant="white"></b-icon-list>
        </b-button>
        <b-nav-item to="/" exact exact-active-class="active">
          <slot name="logo" />
        </b-nav-item>

      </b-navbar-nav>

      <b-navbar-nav class="ml-auto d-flex align-items-center">
        <language />

        <b-icon-bell-fill id="notification-bell" class="ml-4 mr-4" @dblclick="notification"/>
        <notifications-popover/>
        <div>
          <b-dropdown no-caret size="sm" variant="outline-secondary" right style="margin: 0px 0px 0px 0px !important;"
            class=" d-flex align-items-left justify-content-around m-2 userInfoContainer ">
            <template #button-content>
              <div class="container">
                <div style="margin: 0px 10px 0px 0px">
                  <h6 class="m-0">{{ username }}</h6>
                </div>
                <div>
                  <b-avatar></b-avatar>
                </div>
              </div>
            </template>

            <b-dropdown-item-button :button-class="'b-nav-item'" variant="outline-secondary">
              <b-nav-item to="/profile" exact exact-active-class="active">
                <b-icon-pencil-fill font-scale="1.5" class="mt-2 pr-2">

                </b-icon-pencil-fill>Editar
              </b-nav-item>
            </b-dropdown-item-button>

            <b-dropdown-item-button>
              <b-nav-item exact exact-active-class="active" @click="$emit('logout')">
                <b-icon-power font-scale="1.5" class="mt-2 pr-2 logoutBtn">
                </b-icon-power>Logout
              </b-nav-item>
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import Language from "../language/LanguageGrayBackground.vue"
import NotificationsPopover from './NotificationsPopover.vue'
export default {
  components: {
    Language,
    NotificationsPopover
  },
  computed: {
    username() {
      return this.$session.get("user").nickname
    }
  },
  methods:{
    notification(){
      this.$emit("showToast")
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-dark .navbar-nav .nav-link {
  color: black !important
}

.navbar {
  padding: .1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logoutBtn {
  cursor: pointer
}

ul.navbar-nav .ml-auto {
  align-items: center;
  gap: 1rem;

  svg {
    margin: 0 !important;
  }
}

.userInfoContainer {
  gap: 0.5rem;

  h6 {
    color: white;
    // color: #3cd2a5;
    text-transform: capitalize
  }
}
</style>