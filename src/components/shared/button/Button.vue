<template>
    <b-button
    :disabled="disabled" 
    :to="pageLink" 
    @click="triggerAction()" 
    class="button" pill :variant="buttonStyle" 
    :type="type">{{ title }}
    </b-button>
</template>

<script>

export default {

    props: {

        type: {
            required: true, 
            type: String
        },

        title: {
            required: true, 
            type: String
        }, 
        disabled:{
            type:Boolean,
            required: false,
            default: false
        },

        buttonStyle: String,
        pageLink: String
    },

    methods: {

        triggerAction() {
            this.$emit('buttonAction');
        }
    },
}
</script>

<style scoped>
    .button {
        padding: 7px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.1rem;
        width: 100%;
        float: right;
    }
</style>
