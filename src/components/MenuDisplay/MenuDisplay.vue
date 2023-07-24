<template>
    <div>
        <b-tabs content-class="containerM" fill>
            <b-tab title="Video" active>
                <div class="containerOptions">
                    <h4>Resolution</h4>
                    <div></div>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script lang="ts">

export default{
    data(){
        return{
        }
    },
    methods:{
    },
    props:{
        
    }
}


</script>

<style>
.containerOptions{
    background-color: aliceblue;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>