<template>
    <div class="contaier-erro">
        <navBar />

        <div class="erro-items">
            <h1 class="item-erro-style">Erro ao conectar com o servidor</h1>
            <h1 class="item-erro-replay">Tente novamente</h1>

            <img src="../../assets/server.png" alt="" />
        </div>
    </div>
</template>

<script>
    import navBar from '@/components/navBar/navBar.vue'

    export default{
        components:{
            navBar
        }
    }
</script>

<style>

.contaier-erro{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.erro-items{
    width: 100%;
    height: 90%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: var(--FontOther);
}

</style>