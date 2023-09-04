import Vue from 'vue';
import store from '@/store/store'

const url = 'http://172.16.2.148:5005'

export const getDataVideo = async () => {
    try{
        let data = {}
        await Vue.axios
            .get(`${url}/api/video`)
            .then(
                (response) => 
                {   data = response.data
                    store.dispatch('connection/setConnectionToServer', {
                        'isConnected' : {
                            status: true
                        },
                        'dontConnected' : {
                            status: false
                        }
                    })
                },

                () => 
                { 
                    store.dispatch('connection/setConnectionToServer', {
                        'isConnected' : {
                            status: false
                        },
                        'dontConnected' : {
                            status: true
                        }
                    }) 
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
            .get(`${url}/api/audio`)
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', {
                        'isConnected' : {
                            status: true
                        },
                        'dontConnected' : {
                            status: false
                        }
                    })},
                     
                () => { store.dispatch('connection/setConnectionToServer', {
                    'isConnected' : {
                        status: false
                    },
                    'dontConnected' : {
                        status: true
                    }
                }) }
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
            .get(`${url}/api/input`)
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', {
                        'isConnected' : {
                            status: true
                        },
                        'dontConnected' : {
                            status: false
                        }
                    })},
                     
                () => { store.dispatch('connection/setConnectionToServer', {
                    'isConnected' : {
                        status: false
                    },
                    'dontConnected' : {
                        status: true
                    }
                }) }
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
            .get(`${url}/api/output`)
            .then(
                (response) => 
                    {data = response.data
                    store.dispatch('connection/setConnectionToServer', {
                        'isConnected' : {
                            status: true
                        },
                        'dontConnected' : {
                            status: false
                        }
                    })},
                     
                () => { store.dispatch('connection/setConnectionToServer', {
                    'isConnected' : {
                        status: false
                    },
                    'dontConnected' : {
                        status: true
                    }
                })}
            )
        return data;
    }catch (erro){
        console.log(erro);
    }
}

export const queryDataVideo = async (data) => {
    try{
        const params = new URLSearchParams();
        params.append('name', data.name);
        params.append('value', data.value);
        let dataQuery = '';
        
        await Vue.axios
            .put(`${url}/api/video?${params}`)
            .then(response => {
                dataQuery = response.status
            })
        return dataQuery;
    }catch(erro){
        console.log(erro);
    }
}

export const queryDataAudio = async (data) => {
    try{
        const params = new URLSearchParams();
        params.append('name', data.name);
        params.append('value', data.value);
        let dataQuery = '';

        await Vue.axios
            .put(`${url}/api/audio?${params}`)
            .then(response => {
                dataQuery = response.status;
            })
        return dataQuery; 
    }catch(erro){
        console.log(erro);
    }
}


