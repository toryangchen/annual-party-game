# vue+nuxt+koa2 仿美团网项目

该项目为仿写，原数据代码均来源于慕课网视频教程 —— [Vue全家桶+SSR+Koa2全栈开发美团网](https://coding.imooc.com/class/280.html#Anchor)，侵删！

## 技术栈

## 环境准备

1. [安装 node环境](http://nodejs.cn/)
2. [安装 mongodb](https://www.runoob.com/mongodb/mongodb-window-install.html)
3. [安装 redis](https://www.runoob.com/redis/redis-install.html)

## Build Setup

* 由于项目后端使用了，`mongodb`数据库和`redis`，因此项目启动之前必须确保 mongodb和redis服务均已启动

``` bash
# start mongodb
$ mongod

# start redis
$ redis-cli

# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
