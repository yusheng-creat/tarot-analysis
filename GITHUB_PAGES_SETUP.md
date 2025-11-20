# 🚀 GitHub Pages 快速部署指南

## 📋 5分钟完成部署

### 步骤 1: 创建 GitHub 仓库 (2分钟)

1. 打开 [GitHub](https://github.com) 并登录
2. 点击右上角 "+" → "New repository"
3. 设置仓库：
   ```
   Repository name: tarot-analysis
   Description: 一个现代化的数字塔罗占卜应用
   ✅ Public (必须公开)
   ✅ Add a README file
   ```
4. 点击 "Create repository"

### 步骤 2: 上传代码 (2分钟)

在你的项目文件夹中打开终端，复制粘贴以下命令：

```bash
# 初始化并上传代码
git init
git add .
git commit -m "🎉 塔罗分析应用首次发布"
git branch -M main
git remote add origin https://github.com/你的用户名/tarot-analysis.git
git push -u origin main
```

> 💡 记得把 `你的用户名` 替换为你的实际 GitHub 用户名！

### 步骤 3: 启用 GitHub Pages (1分钟)

1. 在你的 GitHub 仓库页面，点击 "Settings"
2. 左侧菜单找到 "Pages"
3. 在 "Source" 下拉菜单选择 "GitHub Actions"
4. 点击 "Save"

### 🎉 完成！

- GitHub 会自动开始构建你的网站
- 几分钟后访问：`https://你的用户名.github.io/tarot-analysis/`
- 在 "Actions" 标签可以查看部署进度

## 🔄 更新网站

以后要更新网站，只需要：

```bash
git add .
git commit -m "✨ 更新功能"
git push
```

GitHub 会自动重新部署！

## 🎯 你的网站功能

部署后，用户可以：
- 🎴 抽取塔罗牌
- 🔮 获得AI解读
- 📱 在手机上使用
- 💾 保存历史记录
- 🌙 切换主题

## 🆘 遇到问题？

### 网站显示 404？
- 确保选择了 "GitHub Actions" 作为部署源
- 等待几分钟让部署完成

### 部署失败？
- 检查 "Actions" 标签的错误信息
- 确保所有测试都通过

### 样式不正常？
- 检查网址是否正确：`https://你的用户名.github.io/tarot-analysis/`

---

🎊 **你的塔罗应用即将上线，准备好与世界分享了！**