//ENVIA, RECEBE E ALTERA OS DADOS DA API

// --> AS INFORMAÇÕES CHEGAM DE MODULES/AUDIO/VIDEO/SAIDA
// Actions ASYNC

export default crudData = {
    data: () => {
        return{
            data: {
                video : {
                    resolution : 144,
                    codec : 5,
                    framRate : 7,
                    quantizer : 4 
                }
            }
        }
    },
    
    actions: {
        Query(){
            try {
                return this.data.video          

            } catch (error) {
                console.log(error);
            }
        },

        //pull --> atualiza

        Query(data){
            try {
                this.data = data
            } catch (error) {
                console.log(error);  
            }
        }
    }
}