
<template>
    <select v-model="$i18n.locale" @change="changeLanguage">
        <option value="en">{{ $i18n.t('english') }}</option>
        <option value="br">{{ $i18n.t('portuguese') }}</option>
    </select>
</template>

<script>
export default {
    methods: {
        changeLanguage(obj) {
            localStorage.setItem('language', obj.target.value)
        }
    }
}
</script>


<style>
select {
    background: initial;
    color: gray;
    border: initial;
    text-align: center;
}

select>option {
    background: initial;
}
</style>