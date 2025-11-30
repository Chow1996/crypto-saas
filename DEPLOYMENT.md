# 部署指南：GitHub + Vercel

## 第一步：上传到 GitHub

### 方法一：使用 VS Code（推荐）

1. **在 VS Code 中打开项目**
   - 打开 VS Code
   - 点击 `文件` → `打开文件夹`，选择 `crypto-saas` 文件夹

2. **使用 VS Code 的 Git 功能**
   - 点击左侧的源代码管理图标（或按 `Ctrl+Shift+G` / `Cmd+Shift+G`）
   - 如果还没有提交所有更改，点击 `+` 号暂存所有文件
   - 在消息框中输入提交信息，例如："Initial commit"
   - 点击 `✓` 提交

3. **发布到 GitHub**
   - 点击源代码管理面板底部的 `发布分支` 或 `发布到 GitHub` 按钮
   - 如果还没有登录 GitHub，VS Code 会提示你登录
   - 选择创建新仓库（Private 或 Public）
   - 输入仓库名称（例如：`crypto-saas`）
   - 点击 `确定` 或 `发布`

### 方法二：使用命令行

```bash
# 1. 确保所有更改已提交
git add .
git commit -m "Initial commit"

# 2. 在 GitHub 上创建新仓库（通过网页）
# 访问 https://github.com/new
# 创建仓库后，不要初始化 README、.gitignore 或 license

# 3. 添加远程仓库并推送（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## 第二步：部署到 Vercel

### 方法一：通过 Vercel 网站（推荐）

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录（如果没有账号，先注册）

2. **导入项目**
   - 点击 `Add New...` → `Project`
   - 在 GitHub 仓库列表中找到你的 `crypto-saas` 仓库
   - 点击 `Import`

3. **配置项目**
   - **Framework Preset**: Vite（Vercel 通常会自动检测）
   - **Root Directory**: `./`（默认即可）
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `dist`（Vite 默认输出目录）
   - **Install Command**: `npm install`（默认）

4. **环境变量**（如果有）
   - 在 `Environment Variables` 部分添加需要的环境变量
   - 点击 `Add` 添加每个变量

5. **部署**
   - 点击 `Deploy` 按钮
   - 等待构建完成（通常 1-2 分钟）
   - 部署成功后，你会得到一个 URL，例如：`https://crypto-saas.vercel.app`

### 方法二：使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 在项目目录中登录
cd /Users/oker/Desktop/crypto-saas
vercel login

# 3. 部署
vercel

# 4. 生产环境部署
vercel --prod
```

## 重要提示

1. **确保 package.json 中有正确的构建脚本**
   - ✅ `"build": "vite build"` - 已配置
   - ✅ `"dev": "vite"` - 已配置

2. **Vercel 会自动检测 Vite 项目**
   - 无需额外配置
   - 构建输出目录自动设置为 `dist`

3. **每次推送到 GitHub 主分支会自动触发部署**
   - Vercel 会监听 GitHub 仓库的推送
   - 自动构建和部署新版本

4. **自定义域名**（可选）
   - 在 Vercel 项目设置中可以添加自定义域名
   - 按照提示配置 DNS 记录

## 故障排除

### 如果构建失败
- 检查 `package.json` 中的依赖是否正确
- 确保 `vite.config.js` 配置正确
- 查看 Vercel 构建日志中的错误信息

### 如果页面空白
- 检查 `vite.config.js` 中的 `base` 配置
- 确保 `index.html` 中的资源路径正确

### 如果 GitHub 推送失败
- 检查是否已登录 GitHub
- 确认仓库权限
- 尝试使用 SSH 而不是 HTTPS

