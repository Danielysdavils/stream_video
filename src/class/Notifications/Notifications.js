export default class Notifications{
    constructor(){

    //Informação enviada pra api
        this.isSave = {
            'save': {
                status: false,
                mensagem: 'Suas alterações foram salvas!'
            },
            'dontSave': {
                status: false,
                mensagem: 'Suas alterações não foram salvas, por favor tente novamente'
            },
            'saving': {
                status: false,
                mensagem: 'Salvando suas alterações...'
            }
        }

    //Conexão com banco de dados
        this.isConnected = {
            'isConnected': {
                status: false,
                mensagem: 'Aguarde um pouco... estamos fazendo os ultimos ajustes para você!'
            },

            'dontConnected': {
                status: false,
                mensagem: 'Desculpe, não foi possível estabelecer uma conexão com o servidor. Por favor, tente novamente.'
            }
        }
    }
}