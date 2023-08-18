export default class Status{
    constructor(){
        this.status = [
            {
                id: 1, 
                name: 'save',
                status: false,
                icone: require('@/assets/icones-tool/config.png')
            },
            {
                id: 2, 
                name: 'dontSave',
                status: false,
                icone: require('@/assets/icones-tool/config.png'),
            },
            {
                id: 3, 
                name: 'saving',
                status: false,
                icone: require('@/assets/icones-tool/config.png'),
            }            
        ]
    }
}