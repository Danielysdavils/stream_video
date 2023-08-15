<template>
    <div class="card-login-conteiner">
        <form action="" class="conteiner-form">
            <div class="tittle-containter">
                <h1 class="tittle-cont">{{ this.tittle }}</h1>
            </div>
          
            <div class="cont-obj">
                <label for="input-valid" class="label-form">{{$t('enterName')}}</label>
                <b-form-input class="input-valid" :state="validateName" :placeholder="$t('enterName')" v-model="nameData"></b-form-input>
            </div>
            
            <div class="cont-obj">
                <label for="input-valid" class="label-form">{{$t('enterPassword')}}</label>
                <b-form-input class="input-valid" type="password" :state="validatePassword" :placeholder="$t('enterPassword')" v-model="passwordData"></b-form-input>
            </div>
           
            <div class="cont-button">
                <b-button v-on:click="submitData()" class="button-form" variant="outline-light">{{$t('login')}}</b-button> 

                <div class="cont-idioma">
                    <ItemToDisplay 
                        :section="'#'" 
                        :dataUrl="'#'" 
                        :dataName="'idiomas'"
                        :dataIcone="require('@/assets/icones-tool/intercambio-de-idiomas.png')"
                        :toolToDisplay="idiomasTools.tools" 
                        
                        @setData="itemClicado" @setDataDropDown="itemClidadoDropDown"/>
                </div>
                
            </div>    
            
            <div class="logo-cont"><LogoApp /></div>
        </form>
    </div>
</template>

<script>
    import LogoApp from '../../components/Logo/LogoApp.vue'
    import ItemToDisplay from '../Item/ItemToDisplay.vue'
    import LenguagesTools from '@/class/Lenguages/LenguagesTools'
    import Lenguages from '@/class/Lenguages/Lenguages'

    export default{
        data: () => {
            return{
                passwordData : '',
                nameData : '',
                dataUser : {},

                idiomasTools: new LenguagesTools()
            }
        },

        computed: {
            validateName(){
                
                return this.nameData == '' ? false : true 
            },

            validatePassword(){
                return this.passwordData == ''  ? false : true
            }
        },

        props:[ 'tittle' ],

        methods: {
            submitData(){
                if(this.validateName && this.passwordData === 'admin'){
                    this.dataUser = {name: this.nameData, password: this.passwordData}
                    
                    this.sendData();
                    this.$router.push('/home')
                }
            },

            sendData(){
                this.$emit('sendData', this.dataUser)
            },

            itemClicado(){
                console.log(this.idiomasTools);
            },

            itemClidadoDropDown(item){
                const lenguages = new Lenguages(item);
                lenguages.setLenguages();
            }
        },

        components:{
            LogoApp,
            ItemToDisplay
        }
    }
</script>

<style>
    .card-login-conteiner{
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color3Gradiente);
        border-radius: 10px;
        padding: 10px;
        z-index: 3;
        width: 40%;

        min-width: 400px;
        max-width: 500px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        color: var(--color4);
        width: 100%;
        height: 100%;

    }

    .cont-obj{
        width:80%;
    }

    .cont-button{
        width: 40%;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    b-form-input{
        margin-bottom: 10px;
    }

    .label-form{
        margin-top: 10px;
        margin-bottom: 10px;
        font-family: var(--FontLabel);
        font-weight: 400;
    }

    .button-form{
        margin-top: 10px;
        font-family: var(--FontLabel);
        font-weight: 400;
    }

    b-form-input{
        background-color: var(--color2);
        font-family: var(--FontLabel);
    }

    .tittle-containter{
        margin-bottom: 20px;

    }

    .tittle-cont{
        font-family: var(--FontTittle);
    }

    @media (min-width: 0px) and (max-width:500px){
        .card-login-conteiner{
            width: 90%;
            min-width: 0px;
        }

        .cont-obj{
            width: 100%;
        }
    }

</style>