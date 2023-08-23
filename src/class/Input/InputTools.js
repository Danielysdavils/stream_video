export default class InputTools{
    tools = [
        {
            id: 0,
            name: 'option1',
            options: {
                button: { 
                    status: true,

                    sections: [
                        {id:1, name: 'op1'},
                        {id:2, name: 'op2'},
                        {id:3, name: 'op3'}
                    ]},

                range: {
                    status: true, 

                    sections: [
                        {id: 1, minValue:0, maxValue: 100}
                    ]},
    
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

