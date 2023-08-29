import Vue from 'vue';
import store from '@/store/store'

export const getDataVideo = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.197:5005/api/video')
            .then(
                (response) => 
                    {data = response.data}, 
                () => { throw new Error('erro ao popular video!')}
            )
            return data;
    }catch(erro){
        console.log(erro);
    }
}

export const getDataAudio = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.197:5005/api/audio')
            .then(response => {
                data = response.data;
            })
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const getDataInput = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.197:5005/api/input')
            .then(response => {
                data = response.data;
            })
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const getDataOutput = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.197:5005/api/output')
            .then(response => {
                data = response.data;
            })
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const queryDataVideo = async () => {
    try{
        let data = ''
        await Vue.axios
            .put('http://172.16.2.197:5005/api/video', store.getters['video/dataVideo'])
            .then(response => {
                data = response.data
            })
        return data;
    }catch(erro){
        console.log(erro);
    }
}

export const queryDataAudio = async () => {
    try{
        let data = ''
        await Vue.axios
            .put('http://172.16.2.197:5005/api/audio', store.getters['audio/dataAudio'])
            .then(response => {
                data = response.data
            })
        return data;
    }catch(erro){
        console.log(erro);
    }
}
