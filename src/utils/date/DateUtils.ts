// DateUtils.ts
export class DateUtils {
  // 获取今天日期，格式为 YYYY-MM-DD
  static getToday(): string {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // 获取今天是星期几，返回中文星期
  static getWeekday(): string {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const today = new Date()
    return weekdays[today.getDay()]
  }

  // 获取当前时分秒，格式为 HH:mm:ss
  static getCurrentTime(): string {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
}
