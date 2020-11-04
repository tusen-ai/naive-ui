<!--anchor:on-->
# 起步
## 安装
使用 npm 安装。

```bash
npm install --save-dev naive-ui
```

## 使用方式
在你项目的 javascript 入口文件添加下列代码。
```js
import { createApp } from 'vue'
import naive from 'naive-ui'

// naive ui 可以和 `vfonts` https://github.com/07akioni/vfonts 配合
// 你可以简单的引入 `vfonts` 中的字体
// 通用字体
import 'vfonts/Lato.css'
// 等款字体
import 'vfonts/FiraCode.css'
// 不用做其他的事情了

const app = createApp()
app.use(naive)
```

## 按需引入（正在开发）