<template>
    <div class="container-menu-display">
        <div class="conteiner-section-item">
            <div v-for="i in this.items" v-bind:key="i.id" >
                <router-link to="/streamconfig/settingsvideo" class="menu-i-selected">
                    <ItemMenuDisplay v-bind:Sendsrc="i.src" v-bind:Sendtext="i.text" /> 
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemMenuDisplay from '@/components/MenuDisplay/ItemMenuDisplay.vue'

    export default{
        props:['items', 'section'],
        
        components:{
           ItemMenuDisplay
        }
    }

</script>

<style>
.container-parent{
    background-color: var(--color4);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.container-menu-display{
    display: flex;
    width: 10%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--color2);
    color: var(--color4);
}

.container-item-display{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.conteiner-section-item{
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;

}


</style>