<template>
    <div class="container-top-menu">
            <div class="conteiner-options-render">
                <div 
                class="container-nav-menu" 
                v-for="option in OptionsLeft" 
                :key="option.id"> 
                    <AppDropDown>
                        <template slot="toggler">
                            <router-link 
                                :to="'/' + option.section + '/' + option.data.url" 
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
                        </template>

                        <div v-if="option.tools != null">
                            <DropDownTopMenu :Tools="option.tools.tools" @itemCliked="setDataDropDown" />
                        </div>
                    </AppDropDown>
                </div>
            </div> 

            <section class="conteiner-section-user">
                <div 
                class="section-option-rigth"
                v-for="option in OptionRigth"
                :key="option.id">
                    <AppDropDown>
                        <template slot="toggler">
                            <router-link 
                                :to="'/' + option.section + '/' + option.data.url"
                                class="container-nav-menu">
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
                        </template>
                        
                        <div v-if="option.tools != null">
                            <DropDownTopMenu :Tools="option.tools.tools" @itemCliked="setDataDropDown" />
                        </div>
                    </AppDropDown>
                </div>
            </section>
    </div>
</template>

<script>
    import AppDropDown from '@/components/DropDown/AppDropDown.vue'
    import DropDownTopMenu from '../DropDownTopMenu/DropDownTopMenu.vue';

    export default{

        data: () =>{
            return{
                buttonName: ''
            }
        },
        
        //Recebe o array de elementos a renderizar
        props: ['OptionsLeft', 'OptionRigth'],

        methods:{
            setDataMenu(optionClicked){
           
                this.$emit('setData', optionClicked);
            },
            
            setDataDropDown(data){
                this.$emit('setDataDropDown', data);
            }
        },

        components:{
            AppDropDown,
            DropDownTopMenu
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
        z-index: 15;
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
        margin-left: 70px;
    }
    
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

    .conteiner-section-user{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 100px;
    }

    @media (min-width: 0px) and (max-width: 800px){
        .container-top-menu{
            height: 10%;
        }

        .conteiner-options-render{
            margin-left: 0px;
        }    

        .conteiner-section-user{
            margin-right: 0px;
        }
    }

    @media (min-width: 801px) and (max-width: 1120px){
        .conteiner-options-render{
            margin-left: 0px;
            
        }
        .conteiner-section-user{
            margin-right: 0px;
        }
    }

    @media(min-width: 0px) and (max-width: 470px){
        .section-user-name{
            display: none;
        }
    }
</style>