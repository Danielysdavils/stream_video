<template>
    <label class="label"><slot/></label>
</template>

<script>

export default {

    props: {

        text : {
            type: String,
            required: false
        }
    }
}

</script>

<style scoped>

.label {
    font-size: 14px;
    color: gray;

}

</style>