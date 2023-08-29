import Video from "@/class/Video/Video"
import {getDataVideo, queryDataVideo} from '@/api/crudApi'

const videoModule = {
    namespaced: true,

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
        },

        //alt do user --> {id: 0, name:'codec', value: 'bbc'}
        addDataVideoModuleUser(state, data){
            state.videoData.Data[data.name] = data;
        }
    },

    actions: {
        //Muda o estado conforme os dados vindos da api
        async getVideoData({commit}){
            commit('addDataVideoModule', await getDataVideo());
        },

        //Muda o estado conforme as alterações do usuário
        async sendDataUser({commit}, data){
            await commit('addDataVideoModuleUser', data);

            // [1.Mandar en query só a data {name: 'codec', value: '75px'} ]
            // [2. Mandar todo el stado actual de mi store [data :{...objects}]]
            
            await queryDataVideo();
        }
    }
}
export default videoModule;

