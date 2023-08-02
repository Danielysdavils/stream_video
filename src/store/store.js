import AudioModule from "./Modules/AudioModule";
import OutputsModule from "./Modules/OutputsModule";
import VideoModule from '@/store/Modules/VideoModule';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        video: VideoModule,
        audio: AudioModule,
        saida: OutputsModule
    }
})

export default store;

