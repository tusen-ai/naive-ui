<!--no-demo-->
# 起步
```component
installCodeGenerator
```
## 安装
使用 npm 安装。

```bash
npm install --save-dev naive-ui
```

## 使用方式
在你项目的 javascript 入口文件添加下列代码。
```js
import naive from 'naive-ui'
import 'naive-ui/lib/styles/index.css'

Vue.use(naive)
```

## 按需引入
如果你需要按需引入组件，可以下面的工具生成按需引入的代码。

> 需要注意的是，以 Base 开头的 CSS 文件并不会确保随着版本的更新保持稳定（我会尽力的保持）。因为它是内部实现的一部分。如果你维持按需引入时升级后样式出现了错误，可以来这里检查一下。虽然把这些公共样式各自打包进每个用到他们的组件是可行的，但是相比于升级的繁琐，我更不喜欢重复的代码。（这不意味着这种解决方案是“更好的”，它只是种选择而已）

<install-code-generator />