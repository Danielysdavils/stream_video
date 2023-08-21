import Video from "@/class/Video/Video"
import { PUT_DATA } from "@/store/Mutations/mutations-type";

const videoModule = {
    namespace: true,

    state: {
        videoData : new Video() 
    },

    getters: {
        getResolution: (state) => {
            return state.videoData.Resolution;
        },

        getCodec : (state) => {
            return state.videoData.Codec;
        },

        getFramRate: (state) => {
            return state.videoData.FramRate;
        },

        getBitRate: (state) => {
            return state.videoData.BitRate;
        },

        getQuantizer: (state) => {
            return state.videoData.Quantizer;
        },
    },

    mutations:{
        [PUT_DATA](state, data){
            state.videoData.Codec = data;
        }
    },

    actions: {
        putCodec({commit}, data){
            commit(PUT_DATA, data);
        },

        putResolution({commit}, data){
            commit(PUT_DATA, data);
        },

        putFramRate({commit}, data){
            commit(PUT_DATA, data);
        },

        putBitRate({commit}, data){
            commit(PUT_DATA, data);
        },

        putQuantizer({commit}, data){
            commit(PUT_DATA, data);
        },
    }
}

export default videoModule;

/*import Video from '@/class/Video/Video'
import { PUT_DATA } from '@/store/Mutations/mutations-type'
//import { getData } from '@/api/crudApi'

const VideoModule = {
    namespaced: true,

    state: {
        videoData : new Video()     
    },

    getters: {
        getCodec: (state) => {
            return state.videoData.Codec;
        }
    },

    mutations: {
        [PUT_DATA](state, newState){
            state.videoData.Codec = newState;
        }
    },

    actions: {
        putCodec({commit}, data){
            commit(PUT_DATA, data);
        }
        
        /*
        async getAndPopulateData({ commit }){
            //Peço pra api os dados
            const data = await getData();
            const newState = data.video;

                // ... Tratamento da info

            // Mando pro mutations os dados recebidos da api
            commit(PUT_DATA, newState)
        },

        //Recebo as alterações do user
        async putData({ commit, newUserStatus }){

            const data = newUserStatus //tratamento dos dados
            
            //mando pra api atualizar
            await queryData(data);

            // Atualizo o state com os dados do usuário
            commit(PUT_DATA, newUserStatus)
        }
        
    }
}

export default VideoModule;
*/

