#!/bin/bash

# 塔罗分析应用部署脚本

echo "🔮 开始部署塔罗分析应用..."

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ 环境检查通过"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行测试
echo "🧪 运行测试..."
npm test -- --watchAll=false

if [ $? -ne 0 ]; then
    echo "❌ 测试失败，请修复后重新部署"
    exit 1
fi

echo "✅ 测试通过"

# 构建项目
echo "🏗️ 构建生产版本..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 检查dist目录
if [ ! -d "dist" ]; then
    echo "❌ dist 目录不存在"
    exit 1
fi

echo "🎉 部署准备完成！"
echo "📁 构建文件位于 dist/ 目录"
echo "🌐 你可以将 dist/ 目录的内容部署到任何静态网站托管服务"

# 如果是GitHub Pages部署
if [ "$1" = "github" ]; then
    echo "📤 准备GitHub Pages部署..."
    
    # 检查是否有git
    if ! command -v git &> /dev/null; then
        echo "❌ Git 未安装"
        exit 1
    fi
    
    # 检查是否在git仓库中
    if [ ! -d ".git" ]; then
        echo "❌ 当前目录不是Git仓库"
        exit 1
    fi
    
    echo "✅ GitHub Pages部署准备完成"
    echo "💡 请确保在GitHub仓库设置中启用GitHub Pages"
    echo "💡 选择 'GitHub Actions' 作为部署源"
fi

echo "🎊 部署脚本执行完成！"