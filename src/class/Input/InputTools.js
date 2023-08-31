export default class InputTools{
    tools = [
        {
            id: 0,
            name: 'audio-source',
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
            style: {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 1,
            name: 'video-source',
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

