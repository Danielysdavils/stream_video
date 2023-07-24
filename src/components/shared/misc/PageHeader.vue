<template>
    <div>
        <section class="w-100">
            <div class="d-flex justify-content-between align-items-center mb-2 header">
                <h1>{{name}}</h1>
                <action-button v-if="toggleDisabled" type="button" :title="buttonTitle" buttonStyle="outline-danger" class="mr-1 control" @buttonAction="toggleDisabled()" ></action-button>
                <action-button v-if="button" type="button" :title="$i18n.t(buttonTitle)" :buttonStyle=buttonStyle @buttonAction="click()" class="m-0"></action-button>
            </div>
            <p>{{description}}</p>
        </section>
        <hr>
    </div>
</template>

<script>
import ActionButton from "../button/TelemetryButton.vue"

export default {
    components:{
        ActionButton,
    },
    props:{
        name:{
            type:String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: ""
        },
        button: {
            type: Boolean,
            required: false,
            default: true
        },
        buttonTitle: {
            type: String,
            required: false,
            default: "new"
        },
        buttonStyle: {
            type: String,
            required: false,
            default: "outline-light"
        },
        toggleDisabled:{
            required:false,
            default: false,
            type:Boolean
        }
    },
    methods:{
        click(){
            this.$emit('click');  
        }
    }
}
</script>

<style lang="scss" scoped>
    @media (min-width: 320px) and (max-width: 991px){
        .header{
            flex-direction: column;
        }
    }
</style>