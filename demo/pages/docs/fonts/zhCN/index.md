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

注意：不同 vfonts 字体提供的字重不同，在使用 `Lato`、`OpenSans` 的时候你需要全局调整 naive-ui 的字重配置。

```html
<!-- 调整 naive-ui 的字重配置 -->
<n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
  <app />
</n-config-provider>
```

## 通过定制主题修改全局字体

如果你不打算使用 `vfonts` 并且想要通过主题调整修改其为别的字体，你需要使用 `n-global-style` 来做到这一点。在不使用 `n-global-style` 的情况下组件不会响应 `theme-overrides` 中的字体变更。

题外话：不使用 `n-global-style` 就能让 `vfonts` 直接生效是一个设计上的妥协，在下个大的版本默认的全局 reset 样式将不再带有字体相关的样式，而是全部置于 `n-global-style` 组件中。
