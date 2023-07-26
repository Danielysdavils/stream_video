<template>
    <div class="container-top-menu"> 
        <router-link to="/streamconfig/settingsvideo" class="conteiner-top-children" >
            <div v-on:click="setDataMenu('update:data-menu-video')" class="backgroundImg"><img src="../../assets/videos (1).png" alt="" class="children-img"></div>
            <h5 class="children-tittle">Video</h5>
        </router-link>

        <router-link to="/streamconfig/audio" class="conteiner-top-children" >
            <div v-on:click="setDataMenu('update:data-menu-audio')" class="backgroundImg">
                <img src="../../assets/microfone (1).png" alt="" class="children-img">
            </div>
            <h5 class="children-tittle">Audio</h5>
        </router-link>
        
        <router-link to="/streamconfig/saida" class="conteiner-top-children" >
            <div v-on:click="setDataMenu('update:data-menu-saida')" class="backgroundImg"><img src="../../assets/conexao-de-nuvem (1).png" alt="" class="children-img"></div>
            <h5 class="children-tittle">Saída</h5>
        </router-link>
    </div>
</template>

<script>

    export default{
        
        data : () => {
            return{
                dataMenu : []
            }
        },
        
        methods:{
            setDataMenu(event){
              
                switch(event){
                    case 'update:data-menu-video':
                        
                        var info = [
                            {id:1, src: '', text: 'resolution'},
                            {id:2, src: '', text: 'codec'},
                            {id:3, src: '', text: 'framRate'},
                            {id:4, src: '', text: 'BitRate'},
                            {id:5, src: '', text: 'Quantizer'}
                        ];
                        this.dataMenu.push(info);

                        this.$emit('setData', this.dataMenu);
                        break;

                    case 'update:data-menu-audio':
                        this.dataMenu = [
                            {id: 1, src: '', text: 'som'},
                            {id: 2, src: '', text: 'hz'}
                        ];
                        this.$emit('setData', this.dataMenu);
                        break;
                        
                    case 'update:data-menu-saida':
                        this.dataMenu = [
                            {id: 1, src: '', text: 'IP'},
                            {id: 2, src: '', text: 'SSS'}
                        ];
                        this.$emit('setData', this.dataMenu);
                        break;
                }
            }
        }
    }

</script>

<style>
    .container-top-menu{
        width: 100%;
        height: 12%;
        display: flex;
        flex-direction: row;
        background-color: var(--color4);
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