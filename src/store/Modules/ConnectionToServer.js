const connectionToServer = {
    namespaced: true,

    state: {
        connectedToServer: false
    },

    getters: {
        getConnectedToServer: (state) => {
            return state.connectedToServer;
        }
    },

    mutations:{
        setConnectionToServer(state, data){
            state.connectedToServer = data;
        }
    },

    actions: {
        setConnectionToServer({commit}, data){
            commit('setConnectionToServer', data);
        }
    }
}

export default connectionToServer;