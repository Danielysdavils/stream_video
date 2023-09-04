import Video from "@/class/Video/Video"
import {getDataVideo, queryDataVideo} from '@/api/crudApi'
//import store from "../store"

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
            return state.videoData.data.resolution;
        },

        codec : (state) => {
            return state.videoData.data.codec;
        },

        framerate: (state) => {
            return state.videoData.data.framerate;
        },

        bitrate: (state) => {
            return state.videoData.data.bitrate;
        },

        preset : (state) => {
            return state.videoData.data.preset;
        },

        tune: (state) => {
            return state.videoData.data.tune;
        }
    },

    mutations:{
        addDataVideoModule(state, data){
            data.data.forEach((element) => {
                state.videoData.data[element.name] = {name: element.name, value: element.value};
            })
        },

        addDataVideoModuleUser(state, data){
            state.videoData.data[data.name] = {name: data.name, value: data.value}
        }
    },

    actions: {
        //Muda o estado conforme os dados vindos da api
        async getVideoData({commit}){
            try{
                commit('addDataVideoModule', await getDataVideo()); 
            }catch(err){
                return err;
            } 
        },

        //Muda o estado conforme as alterações do usuário
        async sendDataUser({commit}, data){
            const dataInfo = await queryDataVideo(data);
            if(dataInfo == 200){
                await commit('addDataVideoModuleUser', data);   
            }
            return dataInfo;
        }
    }
}
export default videoModule;

