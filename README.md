### 官方文档
```
https://panjiachen.github.io/vue-element-admin-site/zh/
```
[组件文档](./README.components.md) 
## 安装依赖
```
npm install
# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

```

### 运行项目
```
npm run serve
```

### 项目打包
```
npm run build:prod
```

### 目录结构说明
```
├─ build    // 构建相关
│ └── index.js
│
├─ public    // 静态页面
│ │── favicon.ico    // favicon图标
│ │── index.html    // html模板
│ └── robots.txt    // 禁止爬虫
│
├─ src    // 主目录
│ ├── api    // 所有请求
│ ├── assets    // 静态资源
│ ├── components    // 全局公用组件
│ ├── directive    // 全局指令
│ ├── filters    // 全局过滤器
│ ├── icons    // 项目所有 svg icons
│ ├── lang    // 国际化 language
│ ├── layout    // 全局 layout
│ ├── router    // 路由
│ ├── store    // 全局 store管理
│ ├── styles    // 全局样式
│ ├── utils    // 全局公用工具类
│ ├── views    // views 所有页面
│ ├── App.vue    // 入口页面
│ ├── main.js    // 入口文件 加载组件 初始化等
│ ├── permission.js    // 权限管理
│ └── settings.js    // 基础设置
├─ .editorconfig    // ide 配置
├─ .env.xxx    // 环境变量配置
├─ vue.config.js    // webpack 配置
├─ .eslintrc.js    // eslint 配置项
├─ .babelrc    // babel-loader 配置
├─ .travis.yml    // 自动化CI配置
├── postcss.config.js    // postcss 配置
└── package.json    // package.json
```
### 自定义权限指令
```
例：
<el-tag v-permission="['admin']">admin</el-tag>
v-permission="['admin']，该指令可以指定哪些角色能看的<el-tag/>
v-permission="['admin','editor']"，可以指定多个角色
该指令有局限性，类似于 <el-tab/> 就只能使用 v-if 指令
```
### 自定义全局权限函数
```
例：
<el-tag v-if="checkPermission(['admin'])">admin</el-tag>
v-if="checkPermission(['admin'])"，该指令可以指定哪些角色能看的<el-tag/>
v-if="checkPermission(['admin','editor'])"，可以指定多个角色
```
### 自定义波浪特效指令
```
例：
<el-button v-waves type="primary">
v-waves
```
### 自定义复制到剪贴板指令
```
例：
<el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
   copy
</el-button>
v-clipboard
```
### 自定义可拖拽弹窗指令
```
例：
<el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="Shipping address" @dragDialog="handleDrag">
</el-dialog>
v-el-drag-dialog
```
### 自定义高度自适应表指令
```
例：
<el-table height="100px" v-el-height-adaptive-table="{bottomOffset: 30}">...</el-table>
v-el-height-adaptive-table
el-table height is must be set  表高度必须设置
```
