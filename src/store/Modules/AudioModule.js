import { getDataAudio, queryDataAudio } from '@/api/crudApi';
import Audio from '@/class/Audio/Audio'


const audioModule = {
    namespaced: true,

    state: {
        audioData : new Audio() 
    },

    getters: {

        data: (state) => {
            return state.audioData;
        },

        codec: (state) => {
            return state.audioData.data.codec
        },
        bitrate: (state) => {
            return state.audioData.data.bitrate;
        },
        channels: (state) => {
            return state.audioData.data.channels;
        },
        'sample-rate': (state) => {
            return state.audioData.data['sample-rate'];
        }
    },

    mutations:{
        addDataAudioModule(state, data){
            data.data.forEach((element) => {
                state.audioData.data[element.name] = {name: element.name, value: element.value};
            })
        },

        addDataAudioModuleUser(state, data){
            state.audioData.data[data.name] = {name: data.name, value: data.value};
        }
    },

    actions: {
        async getAudioData({commit}){
            try{
                commit('addDataAudioModule', await getDataAudio());    
            }catch(err){

                return err;
            }
            
        },

        async sendDataUser({commit}, data){
            const dataInfo = await queryDataAudio(data);
            console.log(dataInfo);
            
            if(dataInfo == 200){
                await commit('addDataAudioModuleUser', data);
                console.log('Alterações salvas!');
            }else{
                console.log('Alterações não salvas!');
            }
        }
    }
}

export default audioModule;