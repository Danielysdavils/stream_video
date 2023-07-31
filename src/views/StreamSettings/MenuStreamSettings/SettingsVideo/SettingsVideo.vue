<template>
    <div class="conteiner-Settings-video">
        <h2 id="resolition" class="tittle-section">Resolution</h2>
        <RangeInput :DataRecive="" :itemSelected="" />
        <SelectedButton />

        <h2 id="codec" class="tittle-section">Codec</h2>
        <RangeInput />

        <h2 id="framRate" class="tittle-section">FramRate</h2>
        <RangeInput />

        <h2 id="bitRate" class="tittle-section">BitRate</h2>
        <RangeInput />

        <h2 id="quantizer" class="tittle-section">Quantizer</h2>
        <RangeInput />
    </div>
</template>

<script>
    import RangeInput from '../../../../components/Graphics/RangeInput.vue'
    import SelectedButton from '../../../../components/Graphics/SelectedButton.vue';
    import  VideoModule from '@/store/Modules/VideoModule';

    export default{
        components :{
            RangeInput,
            SelectedButton
        },

        props: ['itemSelected'],

        data(){
            return{
                tittleItemSelected : this.itemSelected
            }
        }
    }
</script>

<style>
    .conteiner-Settings-video{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tittle-section{
        width: 100%;
        height: 20%;
        color: var(--color4);
        font-size: 20px;
        margin-top: 20px;
        margin-left: 20px;
    }

</style>