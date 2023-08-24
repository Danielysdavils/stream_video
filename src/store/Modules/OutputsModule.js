import { getDataOutput } from '@/api/crudApi';
import Output from '@/class/Output/Output'

const outputsModule = {
    namespace: true,

    state: {
        outputData : new Output() 
    },

    getters: {
        
    },

    mutations:{
        addDataOutputsModule(state, data){
            console.log(state);
            console.log(data);
        }
    },

    actions: {
        async getOutputData({commit}){
            commit('addDataOutsputModule', await getDataOutput());
        }
    }
}

export default outputsModule;