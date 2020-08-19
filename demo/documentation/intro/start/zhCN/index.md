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
import naive from 'naive-ui'
import 'naive-ui/lib/styles/index.css'

// 默认的 CSS 打包不包含字体文件
// 如果需要使用 UI 内置的字体，可以按需添加下面的代码

// 通用字体，多选一
import 'naive-ui/lib/styles/fonts/Lato.css'
import 'naive-ui/lib/styles/fonts/FiraSans.css'
// 等宽字体
import 'naive-ui/lib/styles/fonts/FiraCode.css'

Vue.use(naive)
```

## 按需引入（正在开发）
<!--n-alert type="warning" title="注意" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>按需引入的功能仍是试验性的，遇到任何错误都可以反馈给项目。</n-li>
    <n-li>以 Base 开头的 CSS 目前不确保随更新保持稳定，如果升级后出现错误，可以来这里检查一下。</n-li>
  </n-ol>
</n-alert >
<install-code-generator /-->