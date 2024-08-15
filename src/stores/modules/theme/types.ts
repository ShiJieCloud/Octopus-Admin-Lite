export type LayoutMode = 'classic' | 'horizontal' | 'responsive'
// 主题配置
export interface ThemeConfig {
  // 是否显示主题配置
  showTheme: boolean;
  // 是否启用深色主题
  darkTheme: boolean;
  // 是否启用灰色主题
  grayTheme: boolean;
  // 布局模式
  layoutMode: LayoutMode;
  // 主题主色
  themeColor: string;
  // 预定义的主题颜色列表
  predefineColors: string[];
  // 菜单折叠
  menuCollapse: boolean;
  // 面包屑图标显示
  showBreadcrumbIcon: boolean;
  // 面包屑显示
  showBreadcrumb: boolean;
}
