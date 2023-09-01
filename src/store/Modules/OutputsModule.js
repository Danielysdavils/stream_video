import { getDataOutput } from '@/api/crudApi';
import Output from '@/class/Output/Output'

const outputsModule = {
    namespaced: true,

    state: {
        outputData : new Output() 
    },

    getters: {
        protocol: (state) => {
            return state.outputData.data.protocol;
        },

        ip: (state) => {
            return state.outputData.data.ip;
        },

        port: (state) => {
            return state.outputData.data.port;
        },

        'stream-name': (state) => {
            return state.outputData.data['stream-name'];
        }

    },

    mutations:{
        addDataOutsputModule(state, data){
            data.data.forEach((element) => {
                state.outputData.data[element.name] = {
                    name: element.name, 
                    value: element.value
                }
            })
        }
    },

    actions: {
        async getOutputData({commit}){
            commit('addDataOutsputModule', await getDataOutput());
        }
    }
}

export default outputsModule;