# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 当前架构说明

### 1) 路由入口
- 应用启动入口在 `src/main.tsx`，通过 `RouterProvider` 挂载路由。  
- 路由定义集中在 `src/router.tsx`，使用 `createHashRouter`，并由 `RootLayout` 承载各业务页面。

### 2) 全局状态
- 全局主题状态由 `src/contexts/ThemeContext.tsx` 提供。  
- 购物车全局状态由 `src/contexts/CartContext.tsx` 提供（包含商品、抽屉开关、总价/总数及操作方法）。

### 3) 数据流
- 页面级数据主要由 `src/data/*.ts` 的静态数据源提供（如酒店、体验、商城、文章等）。  
- 典型路径：`router -> page -> section/component -> data/context`。  
- 交互状态（如购物车）通过 Context Hook (`useCart`) 在组件树中读写。

### 4) API 层位置
- 当前前端以本地静态数据为主；后端相关代码位于 `server/`（如 `server/app.js`、`server/store.js`、`server/security.js`）。  
- 如果后续接入远程 API，建议在 `src/lib/` 下新增独立 API client（如 `src/lib/api/*`），由页面/contexts 调用并统一处理鉴权与错误。

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Auth backend (minimal)

This repository now includes a minimal Node.js authentication server under `server/`.

```bash
npm run auth:dev
```

Optional seed credentials can be configured with env vars:

- `AUTH_SEED_LOGIN`
- `AUTH_SEED_PASSWORD`

If either variable is missing, no default user is created.
