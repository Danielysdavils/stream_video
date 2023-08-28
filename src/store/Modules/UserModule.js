import User from "@/class/User/User"

const userModule = {
    namespaced: true,

    state: {
        user : new User() 
    },

    getters: {
        user : (state) => {
            return state.user.name;
        }
    },

    mutations:{
        addDataUser(state, data){
            state.user.name = data.name;
            state.user.password = data.password;
        }
    },

    actions: {
        saveUser({commit}, data){
            commit('addDataUser', data);
        }
    }
}

export default userModule;