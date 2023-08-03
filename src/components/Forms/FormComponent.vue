<template>
    <div class="card-login-conteiner">
        <form action="" class="conteiner-form">
            <div class="tittle-containter">
                <h1 class="tittle-cont">{{ this.tittle }}</h1>
            </div>
          
            <div class="cont-obj">
                <label for="input-valid" class="label-form">Enter your user name:</label>
                <b-form-input class="input-valid" :state="validateName" placeholder="Enter your name" v-model="nameData"></b-form-input>
            </div>
            
            <div class="cont-obj">
                <label for="input-valid" class="label-form">Enter your password:</label>
                <b-form-input class="input-valid" :state="validatePassword" placeholder="Enter your password" v-model="passwordData"></b-form-input>
            </div>
           
            <div class="cont-button">
                <b-button v-on:click="submitData()" class="button-form" variant="outline-light">Login</b-button> 
            </div>    
            
            <div class="logo-cont"><LogoApp /></div>
        </form>
    </div>
</template>

<script>
    import LogoApp from '../../components/Logo/LogoApp.vue'

    export default{
        data: () => {
            return{
                passwordData : '',
                nameData : '',
                dataUser : {} 
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
                    this.dataUser = {userName: this.nameData, userPassword: this.passwordData}
                    this.$router.push('/home')
                }
            }
        },

        components:{
            LogoApp
        }
    }
</script>

<style>
    .card-login-conteiner{
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color2Gradiente);
        border-radius: 10px;
        padding: 20px;
        z-index: 3;
        width: 40%;
        height: 60%;
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
        width: 100%;
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
    }

    .button-form{
        margin-top: 10px;
    }

    .logo-cont{
        margin-top: 10px;
    }

    b-form-input{
        background-color: var(--color2);
    }

    .tittle-containter{
        margin-bottom: 20px;
    }

</style>