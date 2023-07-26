<template>
    <div class="conteiner-card-menu">
        <img src="src" alt="" class="icone-card-menu">
        <h3 class="text-card-menu">{{ text  }}</h3>
    </div>
</template>

<script>
    export default{
        props: ['Sendsrc', 'Sendtext'],

        data : () => {
            return{
                src : this.Sendsrc,
                text: this.Sendtext
            }
        }
    }

</script>

<style>

.conteiner-card-menu{
    width: 100%;
}

</style>