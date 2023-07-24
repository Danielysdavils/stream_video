<template>
    <nav class="conteinerNav">
        <div class="conteinerSettingMenuBar">
            <img src="../../../assets/server.png" alt="" class="iconeMenuBar">
            <router-link to="/streamconfig/settingsvideo" class="linkBar">Settings Video</router-link>
        </div>

        <div class="conteinerSettingMenuBar">
            <img src="../../../assets/server.png" alt="" class="iconeMenuBar">
            <router-link to="/streamconfig/saving" class="linkBar">Saving</router-link>
        </div>

        <div class="conteinerSettingMenuBar">    
            <img src="../../../assets/server.png" alt="" class="iconeMenuBar">
            <router-link to="/streamconfig/alarm" class="linkBar">Alarm</router-link>
        </div>
    </nav>
</template>

<style>

.conteinerNav{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.conteinerSettingMenuBar{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15%;
    text-align: center;
}

</style>

