```sh
  /
 ├── host 本地模块
 └── remote 远程模块
```

两边都是靠的[vite-plugin-federation](https://github.com/originjs/vite-plugin-federation/blob/main/README-zh.md)插件实现组件的导入、导出。

由于懒得再写一个服务端程序，就直接用 vscode 的[Live Server 插件](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)起了个静态服务，

在 remote 打包后，在 host 运行`yarn dev`即可见到效果。

### remote

远程模块另外还引入了[vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts/blob/main/README.zh-CN.md)进行声明文件的打包，

但 dts 插件只能按源码结构打包出多个声明文件，

所以就自己写了个脚本`remote/scripts/dts.ts`在生成声明文件之后把这些打包到一个 d.ts 里面，

并且根据传入的 federation 插件配置替换里面的模块名，让客户端有正确的类型提示

### host

由于 ts 不支持远程类型导入，

客户端也是另外写了一个脚本`host/scripts/tss.js`，用来同步远程的声明文件，

运行`yarn tss`即可将声明文件下载到本地的`src/typings`目录
