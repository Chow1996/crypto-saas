# Crypto SaaS

基于 React + Vite 构建的加密货币 SaaS 应用。

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署

### 部署到 GitHub + Vercel

详细的部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

**快速步骤：**
1. 在 VS Code 中使用源代码管理面板发布到 GitHub
2. 在 [Vercel](https://vercel.com) 导入 GitHub 仓库
3. 点击部署，完成！

## 技术栈

- **React 19** - UI 框架
- **Vite 7** - 构建工具
- **ESLint** - 代码检查

## 项目结构

```
crypto-saas/
├── src/          # 源代码
├── public/       # 静态资源
├── dist/         # 构建输出（自动生成）
└── index.html    # 入口 HTML
```

## 开发说明

本项目使用 Vite 作为构建工具，支持：
- ⚡ 快速热模块替换 (HMR)
- 🎯 优化的生产构建
- 📦 自动代码分割
