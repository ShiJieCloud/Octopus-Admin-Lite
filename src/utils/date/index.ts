import i18n from '@/i18n'

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()

  let greeting = ''
  if (hours >= 6 && hours <= 10) {
    greeting = i18n.global.t('system.message.GoodMorning')
  } else if (hours > 10 && hours <= 14) {
    greeting = i18n.global.t('system.message.GoodNoon')
  } else if (hours > 14 && hours <= 18) {
    greeting = i18n.global.t('system.message.GoodAfternoon')
  } else if (hours > 18 && hours <= 24) {
    greeting = i18n.global.t('system.message.GoodEvening')
  } else if (hours >= 0 && hours < 6) {
    greeting = i18n.global.t('system.message.GoodDawn')
  }

  return greeting
}
