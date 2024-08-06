/**
 * @description 将十六进制颜色转换为 RGB 数组
 * @param {string} hexStr 十六进制颜色字符串，支持 #RRGGBB 和 #RGB 格式
 * @returns {number[]} 返回 [R, G, B] 形式的 RGB 数组
 */
export function hexToRgb(hexStr: string): number[] {
  hexStr = hexStr.replace('#', '')

  let bigint:number

  if (hexStr.length === 3) {
    // 处理 #RGB 格式的情况
    bigint = parseInt(hexStr[0] + hexStr[0] + hexStr[1] + hexStr[1] + hexStr[2] + hexStr[2], 16)
  } else {
    // 处理 #RRGGBB 格式的情况
    bigint = parseInt(hexStr, 16)
  }

  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b]
}

/**
 * @description 将 RGB 数组转换为十六进制颜色字符串
 * @param {number} r 红色通道值
 * @param {number} g 绿色通道值
 * @param {number} b 蓝色通道值
 * @returns {string} 返回 #RRGGBB 格式的十六进制颜色字符串
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * @description 加深颜色值
 * @param {string} color 十六进制颜色字符串，支持 #RRGGBB 和 #RGB 格式
 * @param {number} level 加深程度，0 到 1 之间
 * @returns {string} 返回处理后的加深后的十六进制颜色字符串
 */
export function getDarkColor(color: string, level: number): string {
  const rgb = hexToRgb(color)

  const darkenedRgb = rgb.map(channel => Math.max(0, Math.round(channel * (1 - level))))

  return rgbToHex(darkenedRgb[0], darkenedRgb[1], darkenedRgb[2])
}

/**
 * @description 变浅颜色值
 * @param {string} color 十六进制颜色字符串，支持 #RRGGBB 和 #RGB 格式
 * @param {number} level 变浅程度，0 到 1 之间
 * @returns {string} 返回处理后的变浅后的十六进制颜色字符串
 */
export function getLightColor(color: string, level: number): string {
  const rgb = hexToRgb(color)

  const lightenedRgb = rgb.map(channel => Math.min(255, Math.round(channel + (255 - channel) * level)))

  return rgbToHex(lightenedRgb[0], lightenedRgb[1], lightenedRgb[2])
}
