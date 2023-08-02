import Api from './Api.js';
import Vue from 'vue';

export const getData = async () => {
    try{
        let data = {} 
        await Vue.axios.get(Api).then((response) => {
            data = response
        })
        return data

    }catch(erro){
        console.log(erro);
        return erro
    }
}

export const queryData = async (data) => {
    try{
        return await Api.put(data);
    }catch(erro){
        console.log(erro);
        return erro;
    }
}


