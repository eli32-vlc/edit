---
title: "自托管 FMHY"
description: "本指南将帮助你在本地搭建并运行自己的 FMHY 实例。"
---

# 自托管 {#selfhosting}

::: warning 警告
请注意，你**必须**将自己的实例与官方网站（fmhy.net）区分开，以免混淆。具体步骤见第 4 步。
:::

本指南将帮助你在本地搭建并运行自己的 FMHY 实例。

### Docker（实验性） {#docker-experimental}

要运行本地实例，你需要安装 [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)。

安装完两者后，运行以下命令：

```bash
git clone https://github.com/fmhy/edit.git
cd edit
sudo docker compose up --build
```

构建镜像并启动容器可能需要几分钟时间，服务将运行在 4173 端口。

### Nix Flake {#nix-flake}

你可以使用 [nix](https://nixos.org/) 来搭建开发环境，我们提供了一个 [flake](https://nixos.wiki/wiki/Flakes)，可配置 `nodejs` 和 `pnpm`。

1. 创建仓库分支并用 `git clone https://github.com/fmhy/edit.git` 将其克隆到本地。
2. 运行 `nix flake update` 以更新 flake 锁定文件。
3. 运行 `nix develop` 进入开发环境。
4. 进行你的修改。
5. 运行 `exit` 退出开发环境。

### 手动方式 {#manually}

你需要安装以下内容：
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) - 安装 25.2.1 版本
- [pnpm 9.12.2+](https://pnpm.io/installation)

#### 第 1 步：克隆仓库 {#step-1-clone-the-repository}

```bash
git clone https://github.com/fmhy/edit.git
cd edit
```

#### 第 2 步：安装依赖 {#step-2-install-dependencies}

使用 pnpm 安装项目依赖：

```bash
pnpm install
```

#### 第 3 步：开发模式 {#step-3-development-mode}

以开发模式运行项目：

```bash
# Start the documentation site in dev mode
pnpm docs:dev

# Start the API in dev mode (if needed)
pnpm api:dev
```

开发服务器默认会在 `http://localhost:5173` 启动。

#### 步骤 4：构建生产版本 {#step-4-building-for-production}

你需要更新：
- `meta`：`docs/.vitepress/constants.ts` 中的常量
  - `name`：你的实例名称
  - `hostname`：你的域名
  - `description`：你的实例描述
  - `tags`：Opengraph 标签
  - `build`：构建选项（可通过 [环境变量](/other/selfhosting#environment-variables) 配置）
- `docs/index.md`
  - `title`
  - `description`
  - `hero.name`
  - `hero.tagline`

为生产环境构建项目：

```bash
# Build the documentation site
pnpm docs:build

# Build the API (if needed) using the Node.js preset
NITRO_PRESET=node pnpm api:build
```

#### 步骤 5：预览生产构建 {#step-5-preview-production-build}

在本地预览生产构建：

```bash
# Preview the documentation site
pnpm docs:preview

# Preview the API (if needed)
pnpm api:preview
```

#### 步骤 6：部署 {#step-6-deploy}

更多信息请参阅 [VitePress 部署指南](https://vitepress.dev/guide/deploy)。

### API 部署 {#api-deployment}

如果你想部署 API 组件（反馈系统），需要配置 Cloudflare Workers 和 KV 存储。

#### 前置条件 {#prerequisites}

- 一个 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)
- 已全局安装的 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

#### 步骤 1：配置 Wrangler {#step-1-configure-wrangler}

用你的 Cloudflare 账户信息更新 `wrangler.toml`：

1. 从 Cloudflare 仪表盘获取你的账户 ID（位于右侧边栏）
2. 将 `wrangler.toml` 中的 `account_id` 值替换为你的账户 ID
3. 如果你使用自定义域名，请保留 `workers_dev = false` 并更新 `routes` 部分
4. 如果你要部署到 `*.workers.dev`，请设置 `workers_dev = true` 并删除 `routes` 部分

#### 第 2 步：创建 KV 命名空间 {#step-2-create-kv-namespace}

为数据存储创建一个 KV 命名空间：

```bash
npx wrangler kv:namespace create STORAGE
```

此命令将返回一个命名空间 ID。复制此 ID，并替换 `wrangler.toml` 中 `[[kv_namespaces]]` 部分的 `id` 值（第 14 行）。

**注意：** 如果你不想在本地运行 Wrangler 进行部署（例如在 CI/CD 中），你需要：
1. 在 Cloudflare 控制台中手动创建 KV 命名空间
2. 在你的分支中更新 `wrangler.toml` 里的 `account_id` 和 `id` 两个值

#### 第 3 步：构建并部署 {#step-3-build-and-deploy}

构建并部署 API：

```bash
# Build the API
pnpm api:build

# Deploy to Cloudflare Workers
pnpm api:deploy
```

API 将部署到你配置的域名或 `*.workers.dev` 子域名。

#### 速率限制（可选） {#rate-limiting-optional}

速率限制器绑定需要通过 Cloudflare 控制台进行设置。基础部署可以跳过此步骤，也可以稍后通过 Workers 控制台的“速率限制”部分进行配置。

#### 环境变量 {#environment-variables}

##### 构建时变量（用于文档） {#build-time-variables-for-documentation}

这些变量控制构建文档网站时包含的内容：

- `FMHY_BUILD_NSFW` - 启用 NSFW 侧边栏条目（实验性）
- `FMHY_BUILD_API` - 为反馈系统启用 API 组件

##### 运行时变量（用于 API Worker） {#runtime-variables-for-api-worker}

这些变量供已部署的 Cloudflare Worker API 使用：

- `WEBHOOK_URL` - 用于发布反馈消息的 Discord webhook URL（API 反馈功能所需）

#### 故障排查 {#troubleshooting}

1. 如果遇到 Node.js 版本问题，请确保你使用的是 Node.js 21+
2. 如果遇到 pnpm 相关问题，请确保你使用的是 pnpm 9+
3. 如果遇到构建问题，请尝试清除缓存：
    ```bash
    # Linux
    rm -rf docs/.vitepress/cache

    # PowerShell
    rm -r -fo docs/.vitepress/cache
    ```

### 反向代理 {#reverse-proxy}

此 VitePress 网站应可搭配任意反向代理使用，但可以在[仓库中](https://github.com/fmhy/edit/blob/main/.github/assets/nginx.conf)找到适用于 nginx 服务器的合理配置