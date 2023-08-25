import Video from "@/class/Video/Video"
import {getDataVideo} from '@/api/crudApi'

const videoModule = {
    namespace: true,

    state: {
        videoData : new Video() 
    },

    getters: {
        //teste do preenchimento dos dados
        dataVideo: (state) => {
            return state.videoData
        },

        resolution: (state) => {
            return state.videoData.ComplexData.resolution;
        },

        codec : (state) => {
            return state.videoData.Data.codec;
        },

        framerate: (state) => {
            return state.videoData.Data.framerate;
        },

        bitrate: (state) => {
            return state.videoData.Data.bitrate;
        },

        preset : (state) => {
            return state.videoData.Data.preset;
        }
    },

    mutations:{
        addDataVideoModule(state, data){
            data.elements.forEach((element, index) => {
                state.videoData.Data[element.name] = {id: index, name: element.name, value: element.value};
            })

            data.complexElements.forEach((element, index) => {
                element.elements.forEach(element => {
                    state.videoData.ComplexData.resolution = {id: index, name: 'resolution', value: element.value.split(':')[1]}
                })
            })
        }
    },

    actions: {
        async getVideoData({commit}){
            commit('addDataVideoModule', await getDataVideo());
        }
    }
}
export default videoModule;

