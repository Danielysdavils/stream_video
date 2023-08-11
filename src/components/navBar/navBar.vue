<template>
    <nav class="containerNav">
        <div class="containerOp">
            <router-link to="/home" class="linkBar">
                <h2 class="linkBar" 
                v-on:mouseover="divRow = true" 
                v-on:mouseleave="divRow = false">Home</h2>
            </router-link>
            
            <div class="row" v-show="this.divRow"></div>
        </div> 
        
        <LogoApp class="conteiner-logo"/>

        <div class="containerOp">
                <router-link to="/streamconfig" class="linkBar">
                    <h2 class="linkBar" 
                    v-on:mouseover="divRow = true" 
                    v-on:mouseleave="divRow = false">Stream Config</h2>
                </router-link>

                <div class="row" v-show="this.divRow"></div> 
        </div>
    </nav>
</template>

<script>   

    import LogoApp from '../Logo/LogoApp.vue';
    export default{

        data: () => {
            return{
                divRow : false
            }
        },

        components: {
            LogoApp
        }
    }

</script>
  
<style>
    .containerNav{
        display: flex;
        width: 100%;
        height: 10%;
        flex-direction: row;
        align-items: center;
        background-color: var(--color1);
        color: var(--color4);
        z-index: 4;
        position: relative; 
    }    

    .linkBar{
        font-family: var(--FontLabel);
        font-weight: 400;
        font-size: 15px;
    }
    
    .linkBar:link{
        color: var(--color4);
        text-decoration: none;
    }
    .linkBar:visited{
        color: var(--color4);
    }
    .linkBar:hover{
        transition: 1s ease;
        color: var(--color3);
    }

    .containerOp{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
    }

    .row{
        width: 0.7cm;
        height: 0.01cm;
        background-color: var(--color3);
        border-radius: 20%;

        animation: expandRow 0.3s ease-in-out;
    }

    @keyframes expandRow{
        0%{
            width: 0cm;
        }100%{
            width: 0.7cm;
        }
    }

    @media (min-width: 0px) and (max-width: 800px){
        
        .containerNav{
            height: 8%;
        } 

        .conteiner-logo{
            display: none;
        }

        .containerOp{
            width: 50%;
        }
        
        .row{
            display: none;
        }
      
    }
</style>
  