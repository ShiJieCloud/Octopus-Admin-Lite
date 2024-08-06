export type ThemeMode = 'light' | 'dark'
export type LayoutMode = 'classic' | 'horizontal'
// 主题配置
export interface ThemeConfig {
  showThemeConfig: boolean,
  mode: ThemeMode,
  layoutMode: LayoutMode
}