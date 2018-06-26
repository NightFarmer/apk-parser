# Apk Parser

基于electron、vue、golang开发的apk文件解析桌面工具，跨平台支持Mac、Linux以及Windows。  
使用Golang高速解析apk图标。  
内置aapt解析apk信息。

## 预览

占坑

## 下载

占坑

## 源码构建

源码构建需要NodeJs环境，通过[Node官网](https://nodejs.org/)下载安装或使用[NVM](https://github.com/creationix/nvm)进行安装。
使用Golang编写的解压命令已经编译后内置在/static/unzip文件夹中，所以不需要额外搭建Golang环境。
electron构建需要下载依赖文件，建议使用[cnpm](https://npm.taobao.org/)代替npm进行构建

### 安装cnpm(可选)

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装依赖

``` bash
# 安装依赖
cnpm install 或 npm install
```

### 运行

``` bash
# 调试运行
cnpm run dev 或 npm run dev

```

### 打包

``` bash
# 当前平台构建打包
cnpm run build 或 npm run build

# 全平台构建打包
cnpm run build:all 或 npm run build:all

# 单独打包Mac平台
cnpm run build:mac 或 npm run build:mac

# 单独打包Linux平台
cnpm run build:linux 或 npm run build:linux

# 单独打包Windows平台
cnpm run build:win 或 npm run build:win
```

---

