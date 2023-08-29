//Classe que popula as configurações das ferramentas disponíveis
export default class VideoTools{
    tools = [
        {
            id: 0,
            name: 'resolution',
            options: {
                button: { 
                    status: true,
                    sections: [
                        {id:1, name: '144', status: false}, 
                        {id: 2, name: '720', status: false},
                        {id: 3, name: '1080', status: false}
                    ]},

                range: {
                    status: false, 
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
            name: 'codec',
            options: {
                button: { 
                    status: true, 
                    sections: [
                        {id:1, name: 'mpeg4', status: false}, 
                        {id: 2, name: 'libx264', status: false},
                        {id: 3, name: 'libx265', status: false}
                    ]},

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
        },
        {
            id: 2,
            name: 'framerate',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: true, 
                    sections: [
                        {id: 1, minValue: 10, maxValue: 50}
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
            name: 'bitrate',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: true, 
                    sections: [
                        {id: 1, minValue: 500, maxValue: 2000}
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
            id: 4,
            name: 'preset',
            options: {
                button: { 
                    status: true, 
                    sections: [
                        {id:1, name: 'fast', status: false},
                        {id:2, name: 'veryfast', status: false},
                        {id:3, name: 'ultrafast', status: false}
                    ]},

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

