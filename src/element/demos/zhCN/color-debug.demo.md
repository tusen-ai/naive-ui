# 样式方案（弃用）

它也可以获得 Style Scheme。

确保你理解这些颜色的含义，请看[使用样式方案的注意事项](../doc/n-theme#style-scheme)。

```html
<n-element tag="div" class="myel" style="overflow: auto;" #="{ themeVars }">
  <pre
    :style="{
      color: themeVars.secondaryTextColor,
      transition: `color .3s ${themeVars.easeInOutCubicBezier}`
    }"
  >
{{ JSON.stringify(themeVars, 0, 2) }}</pre
  >
</n-element>
```
