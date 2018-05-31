# 易信发web重构项目

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm i /cnpm i

# serve with hot reload at localhost:8080
npm run start 

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 注解

这是一个基于vue + vue-router + element-ui + ajax 简单的模板(项目中遇到的一些问题，自定义布局，动态表格，图片视频上传OSS)

主要为了解决打包dist目录下js文件包下单个js文件过大

大型框架以及js文件过大都可以采用cdn方式引用,以及路由懒加载

解决问题主要在以下文件：1、index.html。2、src/main.js。3、build/webpack.conf.base.js(commonsChunkPlugin)。4、package.json。
