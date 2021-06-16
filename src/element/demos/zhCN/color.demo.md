# 主题变量

你可以从 default slot 获取主题变量。

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
