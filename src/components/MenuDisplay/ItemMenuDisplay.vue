<template>
    <div class="conteinerCardMenu">
        <div class="conteinerItemDefault" v-if="Clicked.name != Sendtext">
            <div class="cont-img"><img :src="Sendsrc" alt="" class="iconeCardMenu"></div>
            <h3 class="textCardMenu">{{ Sendtext }}</h3>  
        </div>

        <div class="conteinerItemSelected" v-if="Clicked.name == Sendtext">
            <div class="rowSelected"></div>
            <div class="styleBorder">
                <img :src="Sendsrc" alt="" class="iconeCardMenu">
            </div>
        </div>
  
    </div>
</template>

<script>
    export default{
        props: ['Sendsrc', 'Sendtext', 'Clicked']
    }
</script>

<style>

/* STYLE DEFAULT VALUE */

.conteinerCardMenu, .conteinerItemDefault{
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.conteinerCardMenu:hover{
    transition: 0.5s ease;
    background-color: var(--color1);
}

.cont-img{
    width: 100%;
    height: 60%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* STYLE SELECTED VALUE */

.conteinerItemSelected{  
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: var(--color2Gradiente);
}

.textCardMenu{
    font-size: 10px;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.conteiner-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: var(--color5);
}

.styleBorder{
    width: 95%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid;
    border-top-color: var(--color1);
    border-bottom-color: var(--color1);
    border-left-color: var(--color3);
    border-right-color: var(--color3);
    background-color: var(--color3);
    border-radius: 4px;
    padding: 8px;
    margin: 6px;
}

.imgCard{
    width: 50%;
}

.rowSelected{
    width: 5%;
    height: 100%;
    border-radius: 2px;
    background-color: var(--color3);
}


</style>