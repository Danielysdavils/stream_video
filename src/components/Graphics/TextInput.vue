<template>
    <div class="cont-input-text">
        <h2 class="text-item-tittle">{{ valueOfTittle }}</h2>

        <div class="text-item-cont">
            <h2 class="text-item-value">{{ value }}</h2>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['value', 'valueOfTittle']
    }

</script>

<style>
    .cont-input-text{
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text-item-cont{
        display: flex;
        padding: 5px;
        width: 90%;
        background-color: var(--color2Gradiente);
        box-shadow: 1px 1px 10px var(--color1);
        border-radius: 10px;
        align-items: center;
        justify-content: center;
    }

    .text-item-tittle{
        font-size: 14px;
        font-family: var(--FontLabel);
    }
    
    .text-item-value{
        font-size: 35px;
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: var(--FontNavBar);
    }


</style>