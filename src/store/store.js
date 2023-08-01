import AudioModule from "./Modules/AudioModule";
import OutputsModule from "./Modules/OutputsModule";
import VideoModule from '@/store/Modules/VideoModule';

import Vuex from 'vuex'

export const store = new Vuex.Store({
    modules: {
        video: VideoModule,
        audio: AudioModule,
        saida: OutputsModule
    }
})

