<template>
    <div class="container-top-menu">
        <div class="container-nav-menu"> 
            <router-link to="/streamconfig/settingsvideo" class="conteiner-top-children" >
                <div v-on:click="setDataMenu('update:data-menu-video')" class="backgroundImg"><img :src="dataSection[0].LogoTypeVideo" alt="" class="children-img"></div>
                <h5 class="children-tittle">Video</h5>
            </router-link>

            <router-link to="/streamconfig/audio" class="conteiner-top-children" >
                <div v-on:click="setDataMenu('update:data-menu-audio')" class="backgroundImg">
                    <img :src="dataSection[1].LogoTypeAudio" alt="" class="children-img">
                </div>
                <h5 class="children-tittle">Audio</h5>
            </router-link>
        
            <router-link  to="/streamconfig/saida" class="conteiner-top-children" >
                <div v-on:click="setDataMenu('update:data-menu-saida')" class="backgroundImg"><img :src="dataSection[2].LogoTypeSaida" alt="" class="children-img"></div>
                <h5 class="children-tittle">Saída</h5>
            </router-link>
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


    //Desacoplar TopMenu!!
    //Barra de Menu que contem opções e envia as opções selecionadas!!
    
    import AppDropDown from '@/components/DropDown/AppDropDown.vue'
    import AppDropDownContent from '@/components/DropDown/AppDropDownContent.vue'
    import AppDropDownItem from '@/components/DropDown/AppDropDownItem.vue'
    import Video from '@/class/Video'

    export default{
        data : () => {
            return{
                
                dataToDisplay : {},

                dataSection: [
                    {tittle: 'video', LogoTypeVideo: require('../../assets/videos.png')},
                    {tittle: 'audio', LogoTypeAudio: require('../../assets/microfone.png')},
                    {tittle: 'saida', LogoTypeSaida: require('../../assets/conexao-de-nuvem.png')}
                ]
            }
        },
        
        methods:{
            setDataMenu(event){
                switch(event){
                    case 'update:data-menu-video':
                        this.dataMenu = [
                            {id:1, src: require('../../assets/settings.png'), text: 'resolution'},
                            {id:2, src: require('../../assets/settings.png'), text: 'codec'},
                            {id:3, src: require('../../assets/settings.png'), text: 'framRate'},
                            {id:4, src: require('../../assets/settings.png'), text: 'BitRate'},
                            {id:5, src: require('../../assets/settings.png'), text: 'Quantizer'}
                        ];

                        this.$emit('setData', this.dataMenu, this.dataSection[0]);
                        break;

                    case 'update:data-menu-audio':
                        this.dataMenu = [
                            {id: 1, src: require('../../assets/teste.png'), text: 'som'},
                            {id: 2, src: require('../../assets/teste.png'), text: 'hz'}
                        ];

                        this.$emit('setData', this.dataMenu, this.dataSection[1]);
                        break;
                        
                    case 'update:data-menu-saida':
                        this.dataMenu = [
                            {id: 1, src: require('../../assets/videos.png'), text: 'IP'},
                            {id: 2, src: require('../../assets/videos.png'), text: 'SSS'}
                        ];
                        this.$emit('setData', this.dataMenu, this.dataSection[2]);
                        break;
                }
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
    }

   .container-nav-menu{
        height: 50%;
        display: flex;
        flex-direction: row;
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