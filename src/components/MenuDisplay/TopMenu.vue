<template>
    <div class="container-top-menu">
        <div class="conteiner-options-render">
            <div 
            class="container-nav-menu" 
            v-for="option in Options" 
            :key="option.id"> 
                <router-link 
                :to="'/streamconfig/'+ option.data.urlKey" 
                class="conteiner-top-children" >
                    <div 
                    v-on:click="setDataMenu(option.data.name)" 
                    class="backgroundImg">
                        <img 
                            :src="option.data.icone" 
                            alt="" 
                            class="children-img">
                    </div>
                        <h5 class="children-tittle">{{ option.data.name }}</h5>
                </router-link>
            </div>
        </div>
        <section class="conteiner-section-user">
            <div class="conteiner-options-user">
                <AppDropDown>
                    <template slot="toggler">
                        <router-link to="#">
                            <div class="backgroundImg">
                                <img class="children-img" src="../../assets/user3.png" alt="" >
                            </div>
                        </router-link>
                    </template>
                    <AppDropDownContent>
                        <AppDropDownItem>
                            <router-link to="/">
                                <div class="cont-item-dropDown">
                                    <img class="icone-item-dropDown" src="../../assets/sair.png" alt="">
                                    <h3 class="txt-item-dropdown">Logout</h3>
                                </div>
                            </router-link>
                        </AppDropDownItem>
                        <AppDropDownItem>
                            <div class="cont-item-dropDown">
                                <img class="icone-item-dropDown" src="../../assets/config.png" alt="">
                                <h3 class="txt-item-dropdown">Settings</h3>
                            </div>
                        </AppDropDownItem>
                    </AppDropDownContent>
                </AppDropDown>
            </div>
        </section>
    </div>
</template>

<script>
    import AppDropDown from '@/components/DropDown/AppDropDown.vue'
    import AppDropDownContent from '@/components/DropDown/AppDropDownContent.vue'
    import AppDropDownItem from '@/components/DropDown/AppDropDownItem.vue'

    export default{
        //Recebe o array de elementos a renderizar
        props: ['Options'],
        
        methods:{
            //Manda a opção do menu clicada 
            setDataMenu(optionClicked){
                console.log(optionClicked);
                this.$emit('setData', optionClicked)
            }
        },

        components: {
            AppDropDown, 
            AppDropDownContent, 
            AppDropDownItem
        }
    }
</script>

<style>
    .container-top-menu {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color2Gradiente);
        padding: 10px;
        z-index: 10;
        position: relative;
    }

   .container-nav-menu{
        width: auto;
        display: flex;
        flex-direction: row;
    }

    .conteiner-options-render{
        display: flex;
        height: 50%;
    }
    
    .conteiner-top-children{
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 15px;
    }

    .conteiner-top-children:link, .conteiner-top-children:visited{
        color: var(--color4);
        text-decoration: none;
    }

    .backgroundImg{
        background-color: var(--color1);
        border-radius: 50%;
        padding: 10px;
        display: flex;
        align-content: center;
        justify-content: center;

        transition: 1s easy;
    }

    .backgroundImg:hover{
        transition: 5s ease;
        background-color: var(--color4);
    }

    .children-img{
        width: 25px;
        height: 25px;
    }

    .children-tittle{
        font-size: 12px;
        margin-left: 10px;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .conteiner-section-user{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cont-item-dropDown{
        display:flex;
        align-items: center;
    }

    .icone-item-dropDown{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .txt-item-dropdown{
        font-size: 15px;
    }
</style>