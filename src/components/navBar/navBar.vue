<template>
    <nav class="containerNav">

        <div class="containerOp">
            <router-link to="/" class="linkBar">Home</router-link>
            <div class="row"></div>
        </div> 

        <div class="tittle">
            <img class="logotype" src="../../assets/fluxo-de-video.png" alt="logotype">
            <h3 class="logoFont">Stream</h3>
        </div>
        
        <div class="containerOp">
            <router-link to="/streamconfig" class="linkBar">Stream Config</router-link>
            <div class="row"></div> 
        </div>
    
    </nav>
</template>
  
<style>
    .containerNav{
        display: flex;
        width: 100%;
        height: 10%;
        flex-direction: row;
        align-items: center;
        background-color: var(--color1);
        color: var(--color4);
    }

    .logoFont{
        margin-top: 0cm;
        margin-bottom: 0cm;
        margin-left: 5px;
    }

    .tittle{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .logotype{
        width: 50px;
        height: 50px;
    }
    
    .linkBar:link{
        color: var(--color4);
        text-decoration: none;
    }
    .linkBar:visited{
        color: var(--color4);
    }
    .linkBar:hover{
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
        height: 0.1cm;
        background-color: var(--color4);
        border-radius: 20%;
    }
    
</style>
  