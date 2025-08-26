# Figgy AI Like Frontend

一个基于 React + TypeScript + Vite 的智能旅行助手前端应用，仿照飞猪AI助手的交互体验，提供7x24小时AI旅行规划服务。

## 📋 项目概述

这是一个现代化的前端应用，旨在为用户提供智能化的旅行规划服务。通过AI对话的方式，帮助用户发现目的地、寻找便宜机票、规划行程和寻找特色酒店。

### 🎯 主要功能

- **智能对话**: 与AI助手进行自然语言对话
- **旅行推荐**: 智能推荐目的地、机票、酒店等
- **行程规划**: AI辅助制定个性化旅行计划
- **实时响应**: 支持服务器推送事件(SSE)的流式对话

### 🛠️ 技术栈

- **前端框架**: React 19.1.1
- **开发语言**: TypeScript
- **构建工具**: Vite 7.1.2
- **样式处理**: Less + CSS Modules
- **状态管理**: React Hooks (ahooks)
- **网络请求**: Axios + Fetch API
- **代码规范**: ESLint + Prettier

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── bottom/         # 底部组件
│   ├── chat-container/ # 聊天容器组件
│   ├── first-screen/   # 首屏组件
│   └── header/         # 头部组件
├── hooks/              # 自定义Hooks
│   └── user-chat.ts    # 聊天相关Hook
├── pages/              # 页面组件
│   └── main/           # 主页面
├── services/           # 服务层
│   ├── chat.ts         # 聊天服务
│   └── figgy-axios.ts  # HTTP请求配置
├── App.tsx             # 根组件
├── main.tsx            # 入口文件
└── index.css           # 全局样式
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm (推荐) 或 npm/yarn

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动前端开发服务器
pnpm dev

# 启动后端代理服务
pnpm service
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 🔧 配置说明

### 开发环境配置

- **端口**: 默认运行在 `http://localhost:5173`
- **代理**: API请求代理到 `http://127.0.0.1:3000`
- **HTTPS**: 支持本地HTTPS开发(配置SSL证书)

### 构建配置

- **别名**: `@` 指向 `src` 目录
- **CSS模块**: 支持驼峰命名转换
- **TypeScript**: 严格模式配置

## 📡 API接口

### 聊天接口

```typescript
// POST /api/chat
{
  "chat": "用户输入的消息",
  "platform": "h5",
  "h5Version": "h5Version",
  "deviceType": "用户代理字符串"
}
```

**响应格式**: Server-Sent Events (SSE) 流式数据

## 🎨 UI组件

### 首屏组件 (FirstScreen)
- 展示品牌信息和主要功能
- 提供快速推荐选项
- 支持点击推荐项开始对话

### 推荐功能
- 为我发现目的地
- 为我找便宜机票
- 为我规划行程
- 为我找特色酒店

## 🔗 关键依赖

- **@rc-component/image**: 图片组件
- **ahooks**: React Hooks工具库
- **axios**: HTTP客户端
- **classnames**: CSS类名工具
- **rc-textarea**: 文本输入组件

## 📱 响应式设计

- 使用 `postcss-px-to-viewport` 实现移动端适配
- 支持多设备屏幕尺寸
- 优化移动端交互体验

## 🤝 开发规范

### 代码风格
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 React 最佳实践
- TypeScript 严格模式

### 提交规范
- 使用语义化的提交信息
- 代码提交前进行 lint 检查

## 🐛 常见问题

### 开发环境问题
1. **端口占用**: 修改 `vite.config.ts` 中的端口配置
2. **代理失败**: 确保后端服务在 3000 端口运行
3. **SSL证书**: 更新 `vite.config.ts` 中的证书路径

### 构建问题
1. **TypeScript错误**: 检查类型定义文件
2. **依赖冲突**: 清除 `node_modules` 重新安装

## 📄 许可证

本项目为私有项目，版权所有。

## 👥 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

**注意**: 确保在开发前启动后端服务，否则聊天功能无法正常工作。
