<template>
    <AppDropDown>
        <template slot="toggler">
            <router-link 
                :to="'/' + section + '/' + dataUrl" 
                class="conteiner-top-children" >
                    <div 
                        v-on:click="setDataMenu(dataName)" 
                        class="backgroundImg">
                            <img 
                                :src="dataIcone" 
                                alt="" 
                                class="children-img">
                    </div>
                    
                    <h5 class="children-tittle">{{ $t(dataName) }}</h5>
                </router-link>
        </template>

        <div v-if="toolToDisplay != null">
            <DropDownItem :Tools="toolToDisplay" @itemCliked="setDataDropDown" />
        </div>
    </AppDropDown>
</template>

<script>
    import AppDropDown from '@/components/DropDown/AppDropDown.vue'
    import DropDownItem from '@/components/Item/DropDownItem.vue';
    
    export default{

        props: [
            'section',
            'dataUrl',
            'dataName',
            'dataIcone',
            'toolToDisplay'
        ],

        methods:{
            
            //Icone Clicado
            setDataMenu(optionClicked){
                this.$emit('setData', optionClicked);
            },

            //Icone dropdown clicado
            setDataDropDown(data){
                this.$emit('setDataDropDown', data);
            }
        },

        components:{
            AppDropDown,
            DropDownItem
        }
    }
</script>

<style>
     .conteiner-top-children{
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 15px;
    }

    .backgroundImg{
        background-color: var(--color1);
        border-radius: 50%;
        padding: 6px;
        display: flex;
        align-content: center;
        justify-content: center;

        transition: 1s easy;
    }

    .backgroundImg:hover{
        transition: 5s ease;
        background-color: var(--color4);
    }

    .user-and-name:link, .user-and-name:visited{
        display: flex;
        text-decoration: none;
        color: var(--color4);
    }

    .section-user-name{
        margin-left: 6px;
        background-color: var(--color4Gradiente);
        border-radius: 36px;
        margin-bottom: 0px;
        margin-top: 0px;
        color: var(--color1);

        display: flex;
        justify-content: center;
        align-items: center;

        width: 90px;
        text-align: center;
        font-size: 20px;

        transition: 1s ease;
    }

    .section-user-name:hover{
        background-color: var(--color1Gradiente);
        color: var(--color4);
    }

    .children-img{
        width: 20px;
        height: 20px;
    }

    .conteiner-top-children:link, .conteiner-top-children:visited{
        color: var(--color4);
        text-decoration: none;
    }
    
    .children-tittle{
        font-size: 12px;
        margin-left: 10px;
        margin-top: 0px;
        margin-bottom: 0px;
    }


</style>