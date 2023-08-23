export default class AudioTools{
    tools = [
        {
            id: 0,
            name: 'Sound',
            options: {
                button: { 
                    status: false,

                    sections: null},

                range: {
                    status: true, 

                    sections: [
                        {id: 1, minValue: 0, maxValue: 100},
                        {id:2, minValue: 0, maxValue: 100}
                    ]},
    
                text: {
                    status: false, 
                    sections: null}
            },
            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 1,
            name: 'A',
            options: {
                button: { 
                    status: false,

                    sections: null},

                range: {
                    status: true, 

                    sections: [
                        {id: 1, minValue: 0, maxValue: 100},
                        {id:2, minValue: 0, maxValue: 100}
                    ]},
    
                text: {
                    status: false, 
                    sections: null}
            },
            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 2,
            name: 'B',
            options: {
                button: { 
                    status: false,

                    sections: null},

                range: {
                    status: true, 

                    sections: [
                        {id: 1, minValue: 0, maxValue: 100},
                        {id:2, minValue: 0, maxValue: 100}
                    ]},
    
                text: {
                    status: false, 
                    sections: null}
            },
            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 3,
            name: 'C',
            options: {
                button: { 
                    status: false,

                    sections: null},

                range: {
                    status: true, 

                    sections: [
                        {id: 1, minValue: 0, maxValue: 100},
                        {id:2, minValue: 0, maxValue: 100}
                    ]},
    
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