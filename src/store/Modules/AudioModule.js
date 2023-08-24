import { getDataAudio } from '@/api/crudApi';
import Audio from '@/class/Audio/Audio'

const audioModule = {
    namespace: true,

    state: {
        audioData : new Audio() 
    },

    getters: {
        
    },

    mutations:{
        addDataAudioModule(state, data){
            console.log(state);
            console.log(data);
        }
    },

    actions: {
        async getAudioData({commit}){
            commit('addDataAudioModule', await getDataAudio());
        }
    }
}

export default audioModule;