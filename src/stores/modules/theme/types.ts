export type LayoutMode = 'classic' | 'horizontal' | 'responsive'
// 主题配置
export interface ThemeConfig {
  showThemeConfig: boolean,
  darkThemeEnabled: boolean,
  grayThemeEnabled: boolean,
  layoutMode: LayoutMode,
  themePrimaryColor: string,
  predefineColors: string[]
}