import Vue from 'vue';
import store from '@/store/store'

export const getDataVideo = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.148:5005/api/video')
            .then(
                (response) => 
                {   data = response.data
                    store.dispatch('connection/setConnectionToServer', true)
                },

                () => 
                { 
                    store.dispatch('connection/setConnectionToServer', false) 
                }
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
            .get('http://172.16.2.148:5005/api/audio')
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', true)},
                     
                () => { store.dispatch('connection/setConnectionToServer', false) }
            )
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const getDataInput = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.148:5005/api/input')
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', true)},
                     
                () => { store.dispatch('connection/setConnectionToServer', false) }
            )
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const getDataOutput = async () => {
    try{
        let data = {}
        await Vue.axios
            .get('http://172.16.2.148:5005/api/output')
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', true)},
                     
                () => { store.dispatch('connection/setConnectionToServer', false)}
            )
        return data;
    }catch (erro){

        console.log(erro);
    }
}

export const queryDataVideo = async (data) => {
    try{
        await Vue.axios
            .put('http://172.16.2.148:5005/api/video', data.name, data.value)
            .then(response => console.log(response))

    }catch(erro){
        console.log(erro);
    }
}

export const queryDataAudio = async (data) => {
    try{
        await Vue.axios
            .put('http://172.16.2.148:5005/api/audio', data.name , data.value)
            .then(response => {
                console.log(response);
            })

    }catch(erro){
        console.log(erro);
    }
}


