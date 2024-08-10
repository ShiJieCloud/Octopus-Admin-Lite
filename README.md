# Octopus-Admin-Lite

精简的Octopus-Admin项目，包含权限管理和路由功能。

## 项目功能 🔨
- 使用 Vue3.4 + TypeScript 开发，单文件组件＜script setup＞
- 采用 Vite5 作为项目开发
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 支持 Element 组件大小切换、多主题布局、暗黑模式、i18n 国际化
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范

## 安装使用步骤 📔

### 拉取项目
```shell
git clone https://gitcode.com/qq_20185737/Octopus-Admin-Lite.git
```

### 安装项目依赖
```sh
pnpm install
```

### 本地启动

```sh
pnpm dev
```

### 打包

```sh
pnpm build
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
pnpm lint
```

# tailwindcss 

## 响应式设计

常见设备分辨率，默认有五个断点：

| 断点前缀 | 最小宽度 | CSS                                  | 适用       |
| -------- | -------- | ------------------------------------ | ---------- |
| `sm`     | 640px    | `@media (min-width: 640px) { ... }`  | 手机       |
| `md`     | 768px    | `@media (min-width: 768px) { ... }`  | 平板       |
| `lg`     | 1024px   | `@media (min-width: 1024px) { ... }` | 小型桌面   |
| `xl`     | 1280px   | `@media (min-width: 1280px) { ... }` | 大型桌面   |
| `2xl`    | 1536px   | `@media (min-width: 1536px) { ... }` | 超大型桌面 |

## 间距

## 常用布局

- flex 布局
  ```css
  display: flex;
  ```
- grid 布局