<template>
    <div class="selected-group-button">
        <b-button-group>
            <b-button class="buttonItem" :style="setButtonSelected">{{ inputs.name }}</b-button>
        </b-button-group>
    </div>
</template>

<script>

export default{

    //buttonClicked: valor antigo clicado
    //ButtonClick: valor atual clicado 
    data: () => {
        return{
            buttonClicked : '',
            buttonClick : ''
        }
    },
    //Inputs: obj com o valor do button a renderizar ex: {name: 1080px, status: false}
    //ValueOfItem: Valor do button da api
    //ItemClicked: Valor que vem de slideMenu e representa o valor do button (obj) clicado pelo usuário
    props: ['inputs', 'valueOfItem', 'itemClicked'],
   
    //Antes de renderizar os componentes, popula o button click com o valor da vindo da api
    mounted(){     
        this.buttonClick = this.valueOfItem
        console.log(this.buttonClick);
    },

    // Muda o estilo do botão clicado se status do button == true e se buttão clicado igual ao bottão atual renderizado
    computed:{
        setButtonSelected(){
            let style = {}
            this.buttonClick.status && this.buttonClick.name == this.inputs.name 
                ? style = {"background-color" : "var(--color4)", "color" : "var(--color1)"}
                : style = {"background-color" : "var(--color1)"} 
            return style;
        }
    },

    //Observa as mudanzas da propiedade itemClicked. Se o valor atual clicado é diferente ao valor clicado antigo muda as configurações. Não pode haver mais de um botão ativo! 

    watch:{ 
        itemClicked(newV, oldV){
            if(newV.name != oldV.name){
                this.setItemClicked(newV, oldV);
            }
        }
    },

    //Recebe o valor v1 atual e v2 antigo e muda os estados correspondentes. O atual é ativado e o antigo desativado para que não tenhamos mais de um botão ativo
    
    methods:{
        setItemClicked(v1,v2){
            this.buttonClick = {name: v1.name, status: true}
            this.buttonClicked = {name: v2.name, status: false}
        }
    },
}
</script>

<style lang="scss">
.selected-group-button{
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn, .btn-secondary,.btn-group{
    border: none;
    width: 100%;
    font-family: var(--FontOther);
    font-weight: 200;
}

</style>