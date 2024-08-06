export type LayoutMode = 'classic' | 'horizontal'
// 主题配置
export interface ThemeConfig {
  showThemeConfig: boolean,
  darkThemeEnabled: boolean,
  layoutMode: LayoutMode,
  themePrimaryColor: string,
  predefineColors: string[]
}