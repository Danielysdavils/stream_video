import { PUT_DATA } from '@/store/Mutations/mutations-type'
import { getData, queryData } from '@/api/crudApi'
import Video from '@/class/Video' 

export default {
    namespaced: true,

    state: {
        videoData : new Video()     
    },

    getters: {
        videoData: state => state.videoData
    },

    //2. Quando o usuáro muda as config --> actions [mudança de status]
    mutations: {
        // Recebe as alterações do actions e altera o status inicial da app
        [PUT_DATA](state, newState){
            state.videoData.this.data = newState     
        }
    },

    actions: {
        // Aciona as mudanças de status --> Deteta as alterações do user 
        // RECEBE O CRUD DA API
        // Manda para o mutation

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
