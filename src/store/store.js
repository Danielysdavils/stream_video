import userModule from '@/store/Modules/UserModule'
import ToolSelected from '@/store/Modules/ToolSelected'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tool: ToolSelected,
        user: userModule
    }
}) 

export default store;