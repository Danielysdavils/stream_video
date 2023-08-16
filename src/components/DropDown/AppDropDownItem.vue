<template>
    <a href="#" class="item-conteiner">
        <slot/>
    </a>
</template>
  
<script>
    export default {
        name: "AppDropdownItem"
    };
</script>

<style>

    .item-conteiner{
        padding:10px;
        width:100%;
        text-align: center;
    }

    .item-conteiner:link, .item-conteiner:visited{
        color: var(--color4);
        text-decoration: none;
    }
</style>
  