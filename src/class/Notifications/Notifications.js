export default class Notifications{
    constructor(){
        this.save = {
            status: false,
            mensagem: 'Alterações salvas!'
        }

        this.dontSaving = {
            status: false,
            mensagem: 'Alterações não salvas!'
        }

        this.saving = {
            status: false,
            mensagem: 'Salvando alterações!'
        }
    }
}