<template>
    <nav class="containerNav">

        <router-link to="/" class="linkBar">
            <i>Home</i><div class="row"></div>
        </router-link> 
        <router-link to="/stream" class="linkBar">
            <i>Stream</i><div class="row"></div>
        </router-link>
        
        <div><h1>Stream</h1></div>

        <div class="containerOp"><router-link to="/streamconfig" class="linkBar">
            <i>Stream Config</i><div class="row"></div>
        </router-link></div>

        <router-link to="/Others" class="linkBar">
            <i>Other</i><div class="row"></div>
        </router-link>
    
    </nav>
</template>
  
<style>
    .containerNav{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: #2B4C7E;
        color: #C8D2E3;
    }
    .linkBar:link{
        color: #C8D2E3;
        text-decoration: none;
    }
    .linkBar:visited{
        color: #C8D2E3;
    }
    .linkBar:hover{
        color: aqua;
    }
    .containerOp{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .row{
        width: 0.6cm;
        height: 0.1cm;
        background-color: #C8D2E3;
        border-radius: 20%;
    }
    
</style>
  