import vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

// Saída [Ip, protocolo, porta]
// Video [codec, framrate, bitRate, Quantizer]
// Audio [...]

export default new Vuex.store({
    state:{
        Video: {
            width: 0,
            height: 0,
            codec:"",
            framRate: "",
            BitRate: "",
            Quantizer: ""
        },
        
        Saída:{
            Ip: "",
            protocol: "",
            port: ""
        },

        Audio:{

        }
        
    },

    actions:{
        setImagemWidth(state, width, height){
            state.Imagem.width = new CloudinaryImage("url").resize(scale().width(width));

            state.Imagem.height = new CloudinaryImage("url").resize(scale().height(height))
        },

        setResolutionImagem(state, resolution){

        }
    }
})