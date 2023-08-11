import { createI18n } from 'vue-i18n'
import lenguages from '@/lang/translations/lenguages'
import defaultLocale from  '@/lang/translations/lenguages'

const messages = Object.assign(lenguages);

export const i18n = new createI18n({
    locale: 'br',
    fallbackLocale: 'br',
    messages,
    silentTranslationWarn: true,
})