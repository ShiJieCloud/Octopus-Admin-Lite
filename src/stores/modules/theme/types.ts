export type LayoutMode = 'classic' | 'horizontal' | 'responsive'
// 主题配置
export interface ThemeConfig {
  showTheme: boolean; // 是否显示主题配置
  darkTheme: boolean; // 是否启用深色主题
  grayTheme: boolean; // 是否启用灰色主题
  layoutMode: LayoutMode; // 布局模式
  themeColor: string; // 主题主色
  predefineColors: string[]; // 预定义的颜色列表
  menuCollapse: boolean; // 菜单折叠
}
