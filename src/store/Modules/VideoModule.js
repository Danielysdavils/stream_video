import { PUT_DATA} from '../Mutations/mutations-type'
import crudApi from '../../api/crudApi.js'
export default videoModule = {
    state: {
        data : {
            //Status inicial -- lista config padrão
            resolution : {width : 0, height : 0},
            codec : 0,
            framRate : 0,
            BitRate : 0,
            Quantizer : 0
        }
    },

    //2. Quando o usuáro muda as config --> actions [mudança de status]
    mutations: {
        
        // Recebe as alterações do actions e altera o status inicial da app

        [PUT_DATA](state, newState){
            state.data = newState    
        }
    },

    actions: {
        // Aciona as mudanças de status --> Deteta as alterações do user 
        // RECEBE O CRUD DA API
        // Manda para o mutation

        async getAndPopulateData({ commit }){
            //Peço pra api os dados
            const data = await crudApi.getData();
            const newState = data.video;
                // ... Tratamento da info

            // Mando pro mutations os dados recebidos da api
            commit(PUT_DATA, newState)
        },

        //Recebo as alterações do user
        async putData({ commit, newUserStatus }){

            const data = newUserStatus //tratamento dos dados
            
            //mando pra api atualizar
            await crudApi.queryData(data);

            // Atualizo o state com os dados do usuário
            commit(PUT_DATA, newUserStatus)
        }
    }
}