<template>
    <div class="displayContainer">
        <div class="conteiner-border">
            <div class="video-rep"></div>
        </div>
    </div>
</template>

<style>
    .displayContainer{
        width: 100%;
        height: 60%;
        padding: 30px;
    }

    .conteiner-border{
        background-color: var(--color4);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80%;
        border-radius: 5px;
        box-shadow: 1px 1px 20px var(--color3);
    }

    .video-rep{
        width: 100%;
        height: 90%;
        background-color: black;
    }   
</style>