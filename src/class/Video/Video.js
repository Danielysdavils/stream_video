export default class Video{
    constructor(){
        //Populado para testar dados [preencher com API!]
        this.Resolution = [
            {id: 1, value: '720px', status: false},
            {id: 2, value: '1080px', status: true},
            {id: 3, value: '140px', status: false}
        ],
        this.Codec = [
            {id:1, value: 'mpeg4'},
            {id:2, value: 'libx264'},
            {id:3, value: 'libx265'}
        ],
        this.FramRate = [
            {id:1, value: 50}
        ],
        this.BitRate = [
            {id:1, name: 'left', value: 50},
            {id:2, name: 'right', value: 80}
        ],
        this.Quantizer = [
            {id:1, value: 50}
        ],
        this.Preset = [
            {id: 1, value: 'fast'}
        ]
    }
} 