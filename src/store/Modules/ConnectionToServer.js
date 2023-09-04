import Notifications from "@/class/Notifications/Notifications";

const connectionToServer = {
    namespaced: true,

    state: {
        connectedToServer: new Notifications(),
        statusOfData: new Notifications()
    },

    getters: {
        getConnectedToServer: (state) => {
            return state.connectedToServer.isConnected;
        },

        getStatusOfData: (state) => {
            return state.statusOfData.isSave;
        } 
    },

    mutations:{
        setConnectionToServer(state, data){
            state.connectedToServer.isConnected['isConnected'].status = data['isConnected'].status;
            state.connectedToServer.isConnected['dontConnected'].status = data['dontConnected'].status;
        },

        //Altero o estatus da notificação sobre o envio das informações
        setStatusOfData(state, data){
            state.statusOfData.isSave[data.name].status = data.status    
        }
    },

    actions: {
        setConnectionToServer({commit}, data){
            commit('setConnectionToServer', data);
        },

        setStatusOfData({commit}, data){
            commit('setStatusOfData', data);
        }
    }
}

export default connectionToServer;