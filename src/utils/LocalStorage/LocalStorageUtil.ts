class LocalStorageUtil {
  // 存储数据
  static setItem<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error('Error setting item in localStorage:', error)
    }
  }

  // 获取数据
  static getItem<T>(key: string): T | null {
    try {
      const jsonValue = localStorage.getItem(key)
      return jsonValue ? JSON.parse(jsonValue) as T : null
    } catch (error) {
      console.error('Error getting item from localStorage:', error)
      return null
    }
  }

  // 删除数据
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing item from localStorage:', error)
    }
  }

  // 清空所有数据
  static clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

export default LocalStorageUtil
