import Vue from 'vue'
import VueI18n from 'vue-i18n'
import lenguages from '@/lang/translations/lenguages'

Vue.use(VueI18n)

const messages = Object.assign(lenguages);

const i18n = new VueI18n ({
    locale: 'br',
    fallbackLocale: 'br',
    messages,
    silentTranslationWarn: true,
})

export default i18n;