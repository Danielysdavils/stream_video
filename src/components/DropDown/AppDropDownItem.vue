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
        color: var(--color2);
        text-decoration: none;
    }

    .item-conteiner:hover{
        transition: 4s ease;
        background-color: var(--color1);
    }


</style>
  