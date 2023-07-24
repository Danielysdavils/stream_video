<template>
    <b-popover target="notification-bell" custom-class="notification-popover" triggers="click" placement="bottom">
        <template #title>Notificações</template>
        Nenhuma notificação
    </b-popover>
    
</template>
<script>

</script>

<style lang="scss">
 .notification-popover{
    .arrow::after{
        border-bottom-color: #15243a;
    }
    .popover-header{
        background: #15243a;
        color: white
    }
    .popover-body{
        height: 50vh;
        background: #314158;
    }
 }
</style>