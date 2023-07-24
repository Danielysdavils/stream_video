<template>
    <div>
        <b-navbar type="dark" variant="dark">

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-button variant="transparent" class="p-1" v-b-toggle.sidebar-1>
                        <b-icon-justify variant="light"></b-icon-justify>
                    </b-button>

                    <b-nav-item to="/"> <b-icon-house-door-fill></b-icon-house-door-fill> Home </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <select v-model="$i18n.locale" @change="changeLanguage">
                        <option value="en">English</option>
                        <option value="br">Portuguese</option>
                    </select>
                    <b-nav-item-dropdown right>
                        <b-dropdown-item v-if="$session.get('privilege') == 'admin'" to='/user'>
                            <b-icon-person class="pr-1 mr-2"></b-icon-person> {{ $i18n.t('user') }}
                        </b-dropdown-item>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <b-icon-person-circle title="Usuário"></b-icon-person-circle>
                        </template>

                        <!-- <b-dropdown-item v-for="item in items" :key="item.name" :to="item.href">
                            <b-icon-person class="pr-1 mr-2"></b-icon-person> {{$i18n.t(item.name)}}
                        </b-dropdown-item>
                        -->


                        <b-dropdown-item to='/' @click="logout">
                            <b-icon-person class="pr-1 mr-2"></b-icon-person> {{ $i18n.t('exit') }}
                        </b-dropdown-item>

                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script lang="js">
export default {

    data() {
        return {
            items: [
                {
                    name: 'user',
                    href: '/user',
                }
            ]
        }
    },

    methods: {
        log() {
            var logService = new this.$logService();
            var log = new this.$log();
            log.user = this.$session.get('user');
            log.action = "logout usuario" + log.user.id + "-" + log.user.name + " - " + new Date();
            console.log(JSON.stringify(log));
            logService.update(log);
        },

        changeLanguage(obj) {

            localStorage.setItem('language', obj.target.value)
        },

        logout() {
            this.log();
            this.$session.set('logged_id', 0);
            this.$emit('logout');
        },
    }
}
</script>

<style scoped>
select {
    background: transparent;
    border: none;
    color: gray;
}
</style>