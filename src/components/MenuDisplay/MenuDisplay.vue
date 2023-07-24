<template>
    <div>
        <b-tabs v-for="i in tabs" :key="'dyn-tab' + i" :tittle = "'tittle' + i " content-class="container-parent" fill active>
           
        </b-tabs>
    </div>
</template>

<script>

export default{
    data(){
        return{
            tabs : [],
            tabCounter : 0,
            tabsToRender : this.qtdTabs,
            tittle : ''
        }
    },
    methods:{
        createATab(){
            this.tabsToRender.forEach(tab => {
                this.tabs.push(this.tabCounter++)
                this.tittle = tab 
            });
        },

        reciveData(){

        }
    },
    props:{
        qtdTabs : []
  
    }
}


</script>

<style>
.container-parent{
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>