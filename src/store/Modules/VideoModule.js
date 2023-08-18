import { PUT_DATA } from '@/store/Mutations/mutations-type'
//import { getData } from '@/api/crudApi'
//import Video from '@/class/Video/Video'

const VideoModule = {
    namespaced: true,

    state: {
        //videoData : new Video()  
        Resolution : 5,
        Codec : 4,
        FramRate : 3,
        BitRate : 2,
        Quantizer : 1
    },

    getters: {
        //Status atual de todas as ferramentas
        videoData: (state) => {
            return state.videoData
        },
        getResolution: (state) => {
            return state.Resolution
        },
        getCodec: (state) => {
            return state.Codec
        },
        getFramRate: (state) => {
            return state.FramRate
        },
        getBitRate: (state) => {
            return state.BitRate
        },
        getQuantizer: (state) => {
            return state.Quantizer
        }
    },
    //2. Quando o usuáro muda as config --> actions [mudança de status]
    mutations: {
        // Recebe as alterações do actions e altera o status inicial da app
        [PUT_DATA](state, newState){
            state.Codec = newState;
        }
    },

    actions: {
        // Aciona as mudanças de status --> Deteta as alterações do user 
        // RECEBE O CRUD DA API
        // Manda para o mutation

        putCodec({commit}, data){
            commit('PUT_DATA', data);
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
        */
    }
}

export default VideoModule;