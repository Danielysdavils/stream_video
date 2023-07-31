<template>
    <div class="container-top-menu"> 
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
        
        <router-link to="/streamconfig/saida" class="conteiner-top-children" >
            <div v-on:click="setDataMenu('update:data-menu-saida')" class="backgroundImg"><img :src="dataSection[2].LogoTypeSaida" alt="" class="children-img"></div>
            <h5 class="children-tittle">Saída</h5>
        </router-link>
    </div>
</template>

<script>
    export default{
        data : () => {
            return{
                dataMenu : [],
                
                // PRECISA MESMO ISTO??
                
                dataSection: [
                    {tittle: 'video', LogoTypeVideo: require('../../assets/videos (1).png')},
                    {tittle: 'audio', LogoTypeAudio: require('../../assets/microfone (1).png')},
                    {tittle: 'saida', LogoTypeSaida: require('../../assets/conexao-de-nuvem (1).png')}
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
        }
    }
</script>

<style>
    .container-top-menu{
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        background-color: var(--color2Gradiente);
        padding: 10px;
    }

    .conteiner-top-children{
        height: 100%;
        display: flex;
        flex-direction: row;
        font-size: 2%;
        align-items: center;
        margin-right: 15px;
    }

    .backgroundImg{
        background-color: var(--color5);
        border-radius: 50%;
        padding: 10px;
        display: flex;
        align-content: center;
        justify-content: center;
    }

    .children-img{
        width: 25px;
        height: 25px;
    }

    .children-tittle{
        font-size: 10px;
        margin-left: 10px;
        margin-top: 0px;
        margin-bottom: 0px;
    }


</style>