import { getDataAudio } from '@/api/crudApi';
import Audio from '@/class/Audio/Audio'

const audioModule = {
    namespaced: true,

    state: {
        audioData : new Audio() 
    },

    getters: {
        codec: (state) => {
            return state.audioData.codec
        },
        bitrate: (state) => {
            return state.audioData.bitrate;
        },
        channels: (state) => {
            return state.audioData.channels;
        },
        sample: (state) => {
            return state.audioData.sample;
        }
    },

    mutations:{
        addDataAudioModule(state, data){
            data.elements.forEach((element, index) => {
                state.audioData.Data[element.name] = {id: index, name: element.name, value: element.value};
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