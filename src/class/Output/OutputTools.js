export default class OutputTools{
    tools = [
        {
            id: 0,
            name: 'protocol',
            options: {
                button: { 
                    status: false,
                    sections: null},

                range: {
                    status: true, 
                    sections: null},
    
                text: {
                    status: true, 
                    sections: [
                        {id:0, value: ''}
                    ]}
            },
            style: {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 1,
            name: 'ip',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: false, 
                    sections: null},
                    
                text: {
                    status: true, 
                    sections: [
                        {id: 0, value: ''}
                    ]}
            },

            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 2,
            name: 'port',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: false, 
                    sections: null},
                    
                text: {
                    status: true, 
                    sections: [
                        {id: 0, value: ''}
                    ]}
            },

            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 3,
            name: 'stream-name',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: false, 
                    sections: null},
                    
                text: {
                    status: true, 
                    sections: [
                        {id: 0, value: ''}
                    ]}
            },

            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        }
    ]    
}

