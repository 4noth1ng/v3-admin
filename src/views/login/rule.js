import i18n from '@/i18n'

const patrn = /^(\w){6,20}$/
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else if (value.length > 20) {
      callback(new Error(i18n.global.t('msg.login.passwordRule2')))
    } else {
      callback()
    }
  }
}
