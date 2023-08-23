export default class StreamingTools{
    tools = [
        {
            id: 0,
            name: 's1',
            options: {
                button: { 
                    status: false,

                    sections: null},

                range: {
                    status: true, 

                    sections: [
                        {id:1, minValue: 0, maxValue: 100},
                        {id:2, minValue: 0, maxValue: 100}
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
            name: 's2',
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

