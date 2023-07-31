<template>
    <div class="container-menu-display">
        <div class="conteiner-section-item">
            <div class="itemDisplay" v-for="i in this.items" v-bind:key="i.id" >
                <router-link to="/streamconfig/settingsvideo">
                    <div class="conteiner-itemDisplay" v-on:click="setItemClicked(i.text)">
                        <ItemMenuDisplay v-bind:Clicked="ItemClicked" v-bind:Sendsrc="i.src" v-bind:Sendtext="i.text"  />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemMenuDisplay from '@/components/MenuDisplay/ItemMenuDisplay.vue'

    export default{
        data: () => {
            return{
                ItemClicked : {
                    name: ''
                }
            }
        },

        props:['items', 'section'],
        
        components:{
           ItemMenuDisplay
        },

        methods: {
            setItemClicked(element){
                this.ItemClicked = {name: element}
                this.$emit('openBar', this.ItemClicked.name)
            }
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 10%;
    height: 100%;

    background-color: var(--color2Gradiente);
    color: var(--color4);

}

.container-item-display{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.conteiner-section-item{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.conteiner-itemDisplay{
    height: 100%;
}

.itemDisplay{
    height: 10%;
}


</style>