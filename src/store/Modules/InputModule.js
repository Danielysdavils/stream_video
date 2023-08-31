import { getDataInput } from '@/api/crudApi';
import Input from '@/class/Input/Input'

const inputModule = {
    namespaced: true,

    state: {
        inputData : new Input() 
    },

    getters: {
        'audio-source': (state) => {
            return state.inputData.data['audio-source'];
        },

        'video-source' : (state) => {
            return state.inputData.data['video-source'];
        }
    },

    mutations:{
        addDataInputModule(state, data){
            data.data.forEach((element) => {
                state.inputData.data[element.name] = {
                    name: element.name,
                    value: element.value
                };
            })
        }
    },

    actions: {
        async getInputData({commit}){
            commit('addDataInputModule', await getDataInput());
        }
    }
}

export default inputModule;