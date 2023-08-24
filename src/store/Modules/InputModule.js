import { getDataInput } from '@/api/crudApi';
import Input from '@/class/Input/Input'

const inputModule = {
    namespace: true,

    state: {
        inputData : new Input() 
    },

    getters: {
        
    },

    mutations:{
        addDataInputModule(state, data){
            console.log(state);
            console.log(data);
        }
    },

    actions: {
        async getInputData({commit}){
            commit('addDataInputModule', await getDataInput());
        }
    }
}

export default inputModule;