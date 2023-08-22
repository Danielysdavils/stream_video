export default class InputTools{
    tools = [
        {
            id: 0,
            name: 'option1',
            options: {
                button: { 
                    status: null,

                    sections: null},

                range: {
                    status: null, 

                    sections: null},
    
                text: {
                    status: false, 
                    sections: null}
            },
            style: {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 1,
            name: 'option2',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: false, 
                    sections: null},
                    
                text: {
                    status: false, 
                    sections: null}
            },

            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        }
    ]    
}

