
export default VideoModule = {
    state: [
        "resolution" = ['width'= 0, 'height'= 0],
        "codec"= "",
        "framRate" = "",
        "BitRate" = "",
        "Quantizer" = ""
    ],
    getters:{
        //Recebo as alterações do usuário??
        getData(state){
            return state;
        }
    },

    mutations: {
        //Emitir um evento de popular com cada alteração do usuário
        //DATA = RESPOSTA DA API => CONFIG - ESPECIFICAÇÕES DA API

        POPULATE_DATA(state, data){
            state.forEach(tool => {                
                data.forEach(config => {tool = config != " " ? config : tool})
            })
        },
        
        //Criar uma query com as alterações do user
        //Mandar as alterações da query
        SET_DATA(state, dataUser){
            const query = dataUser.forEach(data => {
                state.forEach(state => {data = state})
            })
            
            //Envio de dados
            api.newQuery(query);
        }
    },

    //1. Receber as configurações padrão
    //2. Salvar as alteraçoes do meu usuario
    //3. Enviar ao servidor as configurações do usuário

    actions: {
        //receber as configurações padrão
        async getVideoStatus({ commit }){
            const data = await api.getData();
            commit('POPULATE_DATA', data);
        }, 

        //Criar uma constante com as info do usuário e mandar
        //My status atual é a data do usuário??
        async setData({ commit }){
             
        },

        //if statul atual = status api {não chama}
        //else = chama!
        async updateData({ commit, status }){
            const data = await api.getData();
            if(data != status) commit('POPULATE_DATA', data )
        }
    }
}