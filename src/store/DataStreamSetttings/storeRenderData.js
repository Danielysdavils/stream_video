import vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//Modulo  []export default new Vuex.store({
export default VideoModule = {
    state: {
        tools:[
            {
                Audio : {
                    visible: false,
                    graphics_tools: [],
                    data: [],
                    component: {

                    }
                },
                
                Saída: {
                    visible:false,
                    imagem_tools:[],
                    data: [],
                    component: {

                    }
                },

                Video: {
                    visible: false,
                    video_tools: [],
                    data: [],
                    component:{

                    }
                },    
            }
        ]
    },

    mutations: {
        IMAGE_TOOLS(state, imageTools){
            state.tools.Imagem.imagem_tools.push(imageTools);
            state.tools.Imagem.visible = true;
        },

        GRAPHICS_TOOLS(state, graphicsTools){
            state.tools.Graphics.graphics_tools.push(graphicsTools);
            state.tools.Graphics.visible = true;
        },

        VIDEO_TOOLS(state, videoTools){
            state.tools.Video.video_tools.push(videoTools);
            state.tools.Video.visible = true;
        }
    },

    actions: {

        //Async
        getImageTools({ commit }, imageTools){
            commit('IMAGE_TOOLS', imageTools)
        },

        getVideoTools({ commit }, videoTools){
            commit('VIDEO_TOOLS', videoTools)
        },

        getGrapicsTools({ commit }, graphicTools){
            commit('GRAPHICS_TOOLS', graphicTools)
        }
    }
}  

