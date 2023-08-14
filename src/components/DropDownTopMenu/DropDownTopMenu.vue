<template>
    <div class="conteiner-options-user">
        <AppDropDownContent>
            <section v-for="tool in Tools" :key="tool.id">
                <AppDropDownItem>
                    <router-link to="#" class="link-dropdown">
                        <div class="cont-item-dropDown" v-on:click="itemClicked(tool.name)">
                            <div class="secton-background">
                                <img class="icone-item-dropDown" :src="tool.style.icone" alt="">
                            </div>
                            
                            <h3 class="txt-item-dropdown">{{ tool.name }}</h3>
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
        margin-right: 100px;
    }

    .cont-item-dropDown{
        width:100%;
        display:flex;
        align-items: center;
        margin-left:20px;
    }

    .icone-item-dropDown{
        width: 30px;
        height: 30px;
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
        background-color: var(--color2Gradiente);
        border-radius: 50%;
        padding: 6px;
        margin-right: 5px;
    }

</style>