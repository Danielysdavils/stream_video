export default class Video{
    constructor(){

        this.nameSection = 'Video',

        this.styleSection = {
            icone: require('')
        }

        this.tools = [
            {
                id: 1,
                tool: resolution,  
                options: {width: 0, height: 0},

                style : {
                    name: 'Resolution',
                    icone: {white: require(''), black: require('')}
                }
            },
            {
                id: 2,
                tool: codec,
                value: 0,

                style: {
                    name: 'Codec',
                    icone: {white: require(''), black: require('')}
                }                    
            },
            {
                id: 3,
                tool: framRate,
                value: 0,

                style: {
                    name: 'FramRate',
                    icone: {white: require(''), black: require('')}
                }
            },
            {
                id: 4,
                tool: BitRate,
                value: 0,

                stye: {
                    name: 'BitRate',
                    icone: {white: require(''), black: require('')}
                }  
            },
            {
                id: 5, 
                tool: Quantizer,
                value: 0,

                stye: {
                    name: 'Quantizer',
                    icone: {white: require(''), black: require('')}
                }
            }
        ]  
    }
} 