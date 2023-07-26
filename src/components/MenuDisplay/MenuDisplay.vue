<template>
    <div class="container-menu-display">    
        <div v-for="i in items" v-bind:key="i" class="container-parent">
            <div v-for="n in setD(i)" v-bind:key="n"><h2>{{ n }}</h2></div>
        </div>
    </div>
</template>

<script>

    //import ItemMenuDisplay from '@/components/MenuDisplay/ItemMenuDisplay.vue'
    //<ItemMenuDisplay v-bind:Sendsrc="item.src" v-bind:Sendtext="item.text"  />

    export default{
        data: () => {
            return{
                listItens : this.items
            } 
        },

        props:['items'],
       
        /*
        components:{
           ItemMenuDisplay
        },
        */

        methods:{
            setD: () => {
                return this.items[0].filter((i) => { return this.items[i]})
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
    width: 8%;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: var(--color2);
}

</style>