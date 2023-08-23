export default class VideoTools{
    tools = [
        {
            id: 0,
            name: 'resolution',
            options: {
                button: { 
                    status: true,
                    sections: [
                        {id:1, name: '144px'}, 
                        {id: 2, name: '720px'},
                        {id: 3, name: '1080px'}
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
                        {id:1, name: 'mpeg4'}, 
                        {id: 2, name: 'libx264'},
                        {id: 3, name: 'libx265'}
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
            name: 'framRate',
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
            name: 'bitRate',
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
            name: 'quantizer',
            options: {
                button: { 
                    status: false, 
                    sections: null},

                range: {
                    status: true, 
                    sections: [
                        {id: 1, minValue: 0, maxValue: 30}
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
            id: 5,
            name: 'preset',
            options: {
                button: { 
                    status: true, 
                    sections: [
                        {id:1, value: 'fast'},
                        {id:2, value: 'veryfast'},
                        {id:3, value: 'ultrafast'}
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

