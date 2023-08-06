<template>
    <nav class="containerNav">

        <div class="containerOp">
            <router-link to="/home" class="linkBar">Home</router-link>
            <div class="row"></div>
        </div> 
        
        <LogoApp />

        <div class="containerOp">
            <router-link to="/streamconfig" class="linkBar">Stream Config</router-link>
            <div class="row"></div> 
        </div>
    
    </nav>
</template>

<script>   
    import LogoApp from '../Logo/LogoApp.vue';

    export default{
        components: {
        LogoApp
}
    }
</script>
  
<style>
    .containerNav{
        display: flex;
        width: 100%;
        height: 7%;
        flex-direction: row;
        align-items: center;
        background-color: var(--color1);
        color: var(--color4);
        z-index: 4;
        position: relative;
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
        height: 0.1cm;
        background-color: var(--color4);
        border-radius: 20%;
    }

    .row:hover {
        transition: 1s ease;
        background-color: var(--color3);
    }

</style>
  