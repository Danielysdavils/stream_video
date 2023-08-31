import { getDataAudio } from '@/api/crudApi';
import Audio from '@/class/Audio/Audio'

const audioModule = {
    namespaced: true,

    state: {
        audioData : new Audio() 
    },

    getters: {
        codec: (state) => {
            return state.audioData.data.codec
        },
        bitrate: (state) => {
            return state.audioData.data.bitrate;
        },
        channels: (state) => {
            return state.audioData.data.channels;
        },
        'sample-rate': (state) => {
            return state.audioData.data['sample-rate'];
        }
    },

    mutations:{
        addDataAudioModule(state, data){
            data.data.forEach((element) => {
                state.audioData.data[element.name] = {name: element.name, value: element.value};
            })
        }
    },

    actions: {
        async getAudioData({commit}){
            commit('addDataAudioModule', await getDataAudio());
        }
    }
}

export default audioModule;