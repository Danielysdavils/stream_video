<template>
    <div class="conteinerCardMenu">
        <div class="conteinerItemDefault" v-if="Clicked.name != Sendtext">
            <img :src="Sendsrc" alt="" class="iconeCardMenu">
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

.conteinerCardMenu{
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.conteinerCardMenu:hover{
    background-color: var(--color1);
}

.iconeCardMenu{
    width: 40%;
    height: 40%;

}

/* STYLE SELECTED VALUE */

.conteinerItemSelected{
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: var(--color5);
}

.textCardMenu{
    font-size: 10px;
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
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid;
    border-color: var(--color5);
    background-color: var(--color4);
    border-radius: 10px;
    padding: 8px;
}

.imgCard{
    width: 50%;
}

.rowSelected{
    width: 5px;
    height: 3rem;
    border-radius: 2px;
    background-color: var(--color3);
}


</style>