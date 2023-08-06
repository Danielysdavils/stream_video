import User from "@/class/User/User"
import { ADD_DATA } from "../mutations/mutations-type";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userModule = new Vuex.Store({
    namespace: true,

    state: {
        user : new User() 
    },

    getters: {
        user : (state) => {
            return state.user.name;
        }
    },

    mutations:{
        [ADD_DATA](state, data){
            state.user.name = data.name;
            state.user.password = data.password;
        }
    },

    actions: {
        saveUser({commit}, data){
            commit(ADD_DATA, data);
        }
    }
})

export default userModule;