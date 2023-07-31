import { PUT_DATA, GET_DATA} from '../Mutations/mutations-type'
import CrudData from '../Crud-Data/Crud-Data';

export const videoModule = {
    state: {
        resolution : ['width'= 0, 'height'= 0],
        codec : "",
        framRate : "",
        BitRate : "",
        Quantizer : ""
    },

    mutations: {
        
        //1. Status atual se atualize conforme status video/modules

        //Emitir um evento de popular com cada alteração do usuário
        //DATA = RESPOSTA DA API => CONFIG - ESPECIFICAÇÕES DA API

        [GET_DATA](state){
            return state
        },

        [PUT_DATA](state, data){
            return state = data
        }
    },

    //1. Receber as configurações padrão
    //2. Salvar as alteraçoes do meu usuario
    //3. Enviar ao servidor as configurações do usuário

    actions: {
        //recebe as infos async de crud
        async getStatus({ commit }){
            const state = await CrudData.query();
            commit(GET_DATA, state);
        }, 

        async updateData({ commit, status }){
            const data = await CrudData.query(status);
            if(data != status) commit( PUT_DATA, data )
        }
    }
}