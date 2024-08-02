/**
 * 从 Vite 的环境变量对象中读取值并进行类型转换
 * @param envConf 原始环境变量配置对象
 * @returns ViteEnv 适用于 Vite 的环境变量对象
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  // 创建一个空对象，用于存储处理后的环境变量
  const viteEnv: any = {}

  // 遍历环境变量对象的键
  for (const envName of Object.keys(envConf)) {
    // 将环境变量值中的 '\n' 替换为换行符 '\n'
    let realName = envConf[envName].replace(/\\n/g, '\n')
    // 如果环境变量值是 'true' 或 'false'，则将其转换为布尔值
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    // 如果环境变量值是数字，则将其转换为数字类型
    if (envName === 'VITE_PORT') realName = Number(realName)
    // 如果环境变量值是 JSON 格式，则将其解析为对象
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        // ignore
      }
    }
    viteEnv[envName] = realName
  }

  // 返回处理后的环境变量对象
  return viteEnv
}
