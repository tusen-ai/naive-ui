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
<n-alert type="warning" title="注意" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>按需引入的功能仍是试验性的，遇到任何错误都可以反馈给项目。</n-li>
    <n-li>以 Base 开头的 CSS 目前不确保随更新保持稳定，如果升级后出现错误，可以来这里检查一下。</n-li>
  </n-ol>
</n-alert >
<install-code-generator />