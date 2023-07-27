<template>
    <div class="conteiner-card-menu">
        <img :src="Sendsrc" alt="" class="icone-card-menu">
        <h3 class="text-card-menu">{{ Sendtext }}</h3>
    </div>
</template>

<script>
    export default{
        props: ['Sendsrc', 'Sendtext']
    }

</script>

<style>

.conteiner-card-menu{
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.icone-card-menu{
    width: 40%;
    height: 40%;
    margin-bottom: 10px;
}

.text-card-menu{
    font-size: 10px;
}

</style>