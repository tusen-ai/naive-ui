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

// 如果需要使用 UI 内置的字体，可以按需添加下面的代码
// 通用字体，多选一
import 'naive-ui/fonts/Lato.css'
import 'naive-ui/fonts/FiraSans.css'
// 等宽字体
import 'naive-ui/fonts/FiraCode.css'

const app = createApp()
app.use(naive)
```

## 按需引入（正在开发）