# 全局样式 Global Style

有时候你会希望某些样式会应用到 body 上，例如背景色，字体或者其他什么的。

具体的例子是在暗色模式下，iOS Safari 在过度滚动的情况下会显示出白色，这时候需要我们设定 body 的颜色。

如果你需要它随主题变化，那么请把它放到 `n-config-provider` 内部。

## 用法

```html
// 默认主题
<app>
  <n-global-style />
  ...
</app>
```

```html
// 跟随 n-config-provider 的主题
<n-config-provider>
  <n-global-style />
  ...
</n-config-provider>
```
