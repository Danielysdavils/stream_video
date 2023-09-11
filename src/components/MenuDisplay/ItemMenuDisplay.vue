<template>
    <div class="conteinerCardMenu">
        <div class="conteinerItemDefault" v-if="Clicked != Sendtext">
            <div class="cont-img"><img :src="Sendsrc.white" alt="" class="iconeCardMenu"></div>
            <h3 class="textCardMenu">{{ $t(Sendtext) }}</h3>  
        </div>

        <div class="conteinerItemSelected" v-if="Clicked == Sendtext">
            <div class="rowSelected" :style="setRow"></div>
            <div class="styleBorder">
                <img :style="backgroundImage" :src="Sendsrc.yellow" alt="" class="iconeCardMenu">
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['Sendsrc', 'Sendtext', 'Clicked'],

        computed:{
            setRow(){
                return {"animation" : "moveToUp 0.3s ease-in-out"}
            },
            backgroundImage(){
                return {"background-color": "var(--color2)"}
            }
        }
    }
</script>

<style>

/* STYLE DEFAULT VALUE */

.conteinerCardMenu{
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

.conteinerItemDefault{
    width: 100%;
}

.conteinerItemDefault:hover{
    padding: 2px;
    transition: 0.4s ease;
    background-color: var(--color1);
    border-radius: 10px;
}

.cont-img{
    width: 100%;
    height: 60%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.iconeCardMenu{
    width: 30px;
    height: 30px;

    border-radius: 10px;
    padding: 2px;
    background-color: var(--color1);
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
    font-size: 12px;
    font-family: var(--FontOther);
    font-weight: 400;

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
    border: 1px solid;
    border-top-color: var(--color1);
    border-bottom-color: var(--color1);
    border-left-color: var(--color1);
    border-right-color: var(--color1);
    background-color: var(--color1);
    border-radius: 7px;
    padding: 8px;
    margin: 6px;
}

.rowSelected{
    width: 1%;
    height: 90%;
    border-radius: 2px;
    background-color: var(--color3);
}

@keyframes moveToUp {
    0%{
        height: 0%;
    }
    100%{
        height: 100%;
    }
}

@media (min-width: 0px) and (max-width: 800px){
    .conteinerCardMenu{
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .conteinerItemSelected{
        flex-direction: column-reverse;
    }

    .styleBorder{
        padding: 0px;
        margin: 0px;
        border-radius: 6px;
        border-left-color: var(--color1);
        border-right-color: var(--color1);
    }

    .rowSelected{
        width: 90%;
        height: 5px;
        animation: none !important;
        margin-top: 3px;
    }

    .iconeCardMenu{
        width: 20px;
        height: 20px;
    }

    .textCardMenu{
        height: 20%;
    }
}


</style>