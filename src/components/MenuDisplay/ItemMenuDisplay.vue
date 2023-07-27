<template>
    <div class="conteiner-card-menu"  v-on:click="setIsClicked()">
        <div class="conteiner-itemDefault" v-if="this.itemDefault || this.itemClicked == 0">
            <div class="row-seleected"></div>
            <div class="styleBorder">
                <img :src="Sendsrc" alt="" class="img-card">
            </div>
        </div>

       <div class="conteiner-itemSelected" v-if="this.itemClicked && this.countClicked >= 1">
            <img :src="Sendsrc" alt="" :class="icone-card-menu">
            <h3 class="text-card-menu">{{ Sendtext }}</h3>
       </div>
    </div>
</template>

<script>
    export default{
        props: ['Sendsrc', 'Sendtext'],

        data: () => {
            return{
                itemClicked : false,
                itemDefault : true,
                countClicked : 0
            } 
        }, 
        methods: {
            setIsClicked(){
                this.countClicked += 1
                this.itemClicked = true 
            }
        }
    }
</script>

<style>

.conteiner-card-menu{
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
}

.conteiner-card-menu:hover{
    background-color: var(--color1);
}

.icone-card-menu{
    width: 40%;
    height: 40%;
    margin-bottom: 10px;
}

.text-card-menu{
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
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid;
        border-color: var(--color5);
        background-color: var(--color4);
    }

    .img-card{
        width: 50%;
    }

    .row-seleected{
        width: 8%;
        height: 100%;
        border-radius: 2px;
        background-color: var(--color3);
    }


</style>