#!/bin/bash

echo "🚀 推送 Rate My Employer 到 GitHub"
echo "=================================="
echo ""

# 检查是否有远程仓库
if git remote | grep -q "origin"; then
    echo "✓ 远程仓库已配置"
else
    echo "❌ 尚未配置远程仓库"
    echo ""
    echo "请先在 GitHub 创建仓库，然后运行："
    echo ""
    echo "git remote add origin https://github.com/YOUR_USERNAME/rate-my-employer.git"
    echo ""
    exit 1
fi

echo "📦 准备推送代码..."
echo ""

# 推送到 GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 成功推送到 GitHub!"
    echo ""
    echo "下一步: 在 Vercel 部署"
    echo "1. 访问 https://vercel.com"
    echo "2. 导入你的 GitHub 仓库"
    echo "3. 点击 Deploy"
    echo ""
else
    echo ""
    echo "❌ 推送失败。请检查："
    echo "1. GitHub 仓库地址是否正确"
    echo "2. 是否有推送权限"
    echo "3. 网络连接是否正常"
fi

