# 配置字体

Naive UI 可以和 [vfonts](https://github.com/07akioni/vfonts) 配合，你可以简单的引入 `vfonts` 中的字体，包含常规字体和等宽字体。

只需要在你 App 的入口文件导入字体，即可调整 Naive UI 的字体。

```js
// 你 App 的入口 js 文件
// ...

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp()
app.use(naive)

// ...
```

注意：不同 vfonts 字体提供的字重不同，在使用 `Lato`、`OpenSans` 的时候你需要全局调整 naive-ui 的字重配置：

```html
<!-- 调整 naive-ui 的字重配置 -->
<n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
  <app />
</n-config-provider>
```
