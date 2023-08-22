<template>
    <div class="container-top-menu">
            <div class="conteiner-options-render">
                <div 
                class="container-nav-menu" 
                v-for="data in OptionsLeft" 
                :key="data.id"> 
                    <ItemToDisplay 
                        class="item-left"
                        :section="data.section" 
                        :dataUrl="data.data.url" 
                        :dataName="data.data.name"
                        :dataIcone="data.data.icone"
                        :toolToDisplay="data.tools != null ? data.tools.tools : null" 
    
                        @setData="itemClicado" @setDataDropDown="itemClidadoDropDown"/>
                </div>
            </div> 

            <section class="conteiner-section-user">
                <div 
                class="section-option-rigth"
                v-for="data in OptionRigth"
                :key="data.id">
                    <ItemToDisplay 
                        class="item-right"
                        :section="data.section" 
                        :dataUrl="data.data.url" 
                        :dataName="data.data.name"
                        :dataIcone="data.data.icone"
                        :toolToDisplay="data.tools != null ? data.tools.tools : null" 
                        
                        @setData="itemClicado" @setDataDropDown="itemClidadoDropDown"/>
                </div>
            </section>
    </div>
</template>

<script>

    import ItemToDisplay from '@/components/Item/ItemToDisplay.vue'

    export default{

        data: () => {
            return{
                dataSelected: ''
            }
        },
        
        //Recebe o array de elementos a renderizar
        props: ['OptionsLeft', 'OptionRigth'],

        components:{
            ItemToDisplay
        },

        methods:{
            itemClicado(item){
                this.dataSelected = item;

                this.$emit('itemClicadoWithoutDropDown', item);
            },

            itemClidadoDropDown(item){
                
                this.$emit('itemClicado', this.dataSelected, item);
            }
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
        width: 70%;
    }
    
    .conteiner-section-user{
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 50px;  
    }

    .item-right{
        margin-right: 10px !important; 
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