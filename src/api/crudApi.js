import Api from './Api.js';

export const getData = async () => {
    try{
        const data = await Api.get()
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


