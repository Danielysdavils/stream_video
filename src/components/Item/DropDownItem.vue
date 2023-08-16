<template>
    <div class="conteiner-options-user">
        <AppDropDownContent>
            <section class="cont-item-display" v-for="tool in Tools" :key="tool.id">
                <AppDropDownItem>
                    <router-link :to="tool.url" class="link-dropdown">
                        <div class="cont-item-dropDown" v-on:click="itemClicked(tool.name)">
                            <div class="secton-background">
                                <img class="icone-item-dropDown" :src="tool.style.icone" alt="">
                            </div>
                            
                            <h3 class="txt-item-dropdown">{{ $t(tool.name) }}</h3>
                        </div>
                    </router-link>
                </AppDropDownItem>
            </section>
        </AppDropDownContent>
    </div>
</template>

<script>
    import AppDropDownContent from '@/components/DropDown/AppDropDownContent.vue'
    import AppDropDownItem from '@/components/DropDown/AppDropDownItem.vue'

    export default{
        props: ['Tools'],

        components:{
            AppDropDownContent,
            AppDropDownItem
        },

        methods:{
            itemClicked(item){
                this.$emit('itemCliked', item);
            }
        }
    }
</script>

<style>
    .conteiner-options-user{
        margin-right: 20px;
    }

    .cont-item-dropDown{
        width:100%;
        display:flex;
        align-items: center;
        margin-left:10px;
        margin-right: 10px;
    }

    .icone-item-dropDown{
        width: 25px;
        height: 25px;
    }

    .link-dropdown:visited, .link-dropdown:link{
        text-decoration: none;
        color: var(--color2);
    }

    .txt-item-dropdown{
        font-size: 15px;
        color: var(--color4);
    }

    .secton-background{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color4Gradiente);
        border-radius: 50%;
        padding: 6px;
        margin-right: 5px;
    }

    .cont-item-display{
        border-radius: 15px;
    }

    .cont-item-display:hover{
        transition: background-color 1s ease;
        background-color: var(--color2);
    }

</style>