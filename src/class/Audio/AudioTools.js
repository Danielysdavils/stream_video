export default class AudioTools{
    tools = [
        {
            id: 0,
            name: 'codec',
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
                        {id: 1, value: 'aac'}
                    ]}
            },
            style : {
                icone: {white: require('@/assets/icones-tool/teste1-white.png'), yellow: require('@/assets/icones-tool/teste1-yellow.png')}
            }
        },
        {
            id: 1,
            name: 'bitrate',
            options: {
                button: { 
                    status: false,
                    sections: null},

                range: {
                    status: true, 
                    sections: [
                        {id: 1, minValue: 10, maxValue: 200}
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
            name: 'channels',
            options: {
                button: { 
                    status: true,
                    sections: [
                        {id: 0, name: '1'},
                        {id: 1, name: '2'}
                    ]},

                range: {
                    status: true, 

                    sections: null},
    
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
            name: 'sample',
            options: {
                button: { 
                    status: true,
                    sections: [
                        {id:0, name: '44100'},
                        {id:1, name: '48'},
                        {id:2, name: '96'},
                        {id:3, name: '192'}
                    ]},

                range: {
                    status: true, 
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