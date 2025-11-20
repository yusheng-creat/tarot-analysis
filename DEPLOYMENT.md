# 🚀 GitHub Pages 部署指南

## 📋 部署步骤

### 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `tarot-analysis`
   - **Description**: `一个现代化的数字塔罗占卜应用`
   - **Visibility**: Public (必须是公开仓库才能使用免费的GitHub Pages)
   - ✅ 勾选 "Add a README file"
4. 点击 "Create repository"

### 2. 上传代码到 GitHub

在你的项目目录中打开终端，执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "🎉 Initial commit: 完整的塔罗分析应用"

# 设置主分支名称
git branch -M main

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/tarot-analysis.git

# 推送代码到 GitHub
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 4. 等待自动部署

- GitHub Actions 会自动检测到 `.github/workflows/deploy.yml` 文件
- 自动开始构建和部署过程
- 你可以在 "Actions" 标签中查看部署进度
- 部署完成后，你的网站将在以下地址可用：
  ```
  https://你的用户名.github.io/tarot-analysis/
  ```

## 🔧 自动化功能

我们的部署配置包含以下自动化功能：

- ✅ **自动构建**: 每次推送代码时自动构建
- ✅ **自动测试**: 构建前运行所有测试
- ✅ **自动部署**: 测试通过后自动部署到 GitHub Pages
- ✅ **缓存优化**: 使用 npm 缓存加速构建
- ✅ **错误处理**: 构建失败时会显示详细错误信息

## 📱 访问你的网站

部署完成后，你可以：

1. **访问网站**: `https://你的用户名.github.io/tarot-analysis/`
2. **分享链接**: 发送给朋友体验你的塔罗应用
3. **查看状态**: 在仓库的 "Actions" 标签查看部署状态

## 🔄 更新网站

要更新你的网站，只需：

```bash
# 修改代码后
git add .
git commit -m "✨ 添加新功能"
git push
```

GitHub Actions 会自动重新构建和部署！

## 🎯 下一步

- 🌟 **Star 你的仓库**: 让更多人发现你的项目
- 📢 **分享项目**: 在社交媒体上展示你的作品
- 🐛 **收集反馈**: 鼓励用户报告问题和建议
- 🚀 **持续改进**: 根据用户反馈添加新功能

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查 "Actions" 标签中的错误日志，通常是测试失败或构建错误。

### Q: 网站显示 404 错误？
A: 确保在 Settings > Pages 中选择了 "GitHub Actions" 作为源。

### Q: 样式或资源加载失败？
A: 检查 `vite.config.ts` 中的 `base` 配置是否正确设置为 `/tarot-analysis/`。

---

🎉 **恭喜！你的塔罗分析应用即将与世界分享！**