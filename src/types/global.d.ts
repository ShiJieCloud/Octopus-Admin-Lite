// 定义泛型 Recordable，键类型为字符串、值类型为 T
declare type Recordable<T = any> = Record<string, T>

// 定义接口 ViteEnv，描述项目的环境变量结构
declare interface ViteEnv {
  // 运行环境，可选值为 'development', 'production' 或 'test'
  VITE_NODE_ENV: 'development' | 'production' | 'test'
  // 应用标题
  VITE_GLOB_APP_TITLE: string
  // 服务端口
  VITE_PORT: number
  // 是否自动在浏览器打开应用
  VITE_OPEN: boolean
  // 是否启用 gzip 压缩
  VITE_REPORT: boolean
  // 是否启用 gzip 压缩
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
  // 是否删除原始文件
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  // 是否删除控制台
  VITE_DROP_CONSOLE: boolean
  // 公共路径
  VITE_BASE_URL: string
  // 全局 API 地址
  VITE_GLOB_API_URL: string
  // 代理配置
  VITE_PROXY: [string, string][]
  // 是否启用图片压缩
  VITE_USE_IMAGEMIN: boolean
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
}