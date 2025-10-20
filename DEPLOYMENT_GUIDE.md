# 部署指南 - Rate My Employer

## 📦 推送到 GitHub

### 步骤 1: 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 输入仓库名称: `rate-my-employer` (或你喜欢的名称)
3. 选择 **Public** 或 **Private**
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 步骤 2: 推送代码到 GitHub

创建仓库后，GitHub 会显示命令。运行以下命令（替换成你的仓库地址）：

```bash
cd /Users/liujiekun/Desktop/工作/insforge/demo/rme

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/rate-my-employer.git

# 推送代码
git branch -M main
git push -u origin main
```

## 🚀 部署到 Vercel

### 方法 1: 通过 Vercel 网站 (推荐)

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Log In" (建议用 GitHub 账号登录)
3. 点击 "Add New Project"
4. 选择 "Import Git Repository"
5. 选择你的 `rate-my-employer` 仓库
6. Vercel 会自动检测到这是一个 Vite 项目
7. 点击 "Deploy" 开始部署

**就这么简单！** Vercel 会自动构建并部署你的应用。

### 方法 2: 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
cd /Users/liujiekun/Desktop/工作/insforge/demo/rme
vercel
```

按照提示操作即可。

## ⚙️ 环境配置

由于 InsForge 的 API URL 已经硬编码在 `src/lib/insforge.js` 中，所以不需要额外的环境变量配置。

## 🎉 部署完成后

1. Vercel 会给你一个部署 URL，例如: `https://rate-my-employer.vercel.app`
2. 每次你推送代码到 GitHub，Vercel 会自动重新部署
3. 你可以在 Vercel 仪表板查看部署状态和日志

## 📝 注意事项

- 应用已配置 `vercel.json` 来正确处理 React Router 路由
- 所有请求都会重定向到 `index.html`，这样直接访问路由（如 `/leaderboard`）也能正常工作
- Google OAuth 回调需要更新你的 InsForge OAuth 配置（添加 Vercel URL 作为回调地址）

## 🔧 更新 OAuth 配置

部署后，你需要在 InsForge 后台更新 Google OAuth 的 Redirect URI：

1. 登录 InsForge 控制台
2. 进入 Auth 设置
3. 在 Google OAuth 配置中添加你的 Vercel URL
4. 例如: `https://your-app.vercel.app`

## 📱 自定义域名 (可选)

在 Vercel 项目设置中，你可以添加自定义域名：

1. 进入项目设置 → Domains
2. 添加你的域名
3. 按照指示配置 DNS 记录

---

🎊 **恭喜！你的应用已经准备好部署了！**

