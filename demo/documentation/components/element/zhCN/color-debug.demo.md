# 样式方案（弃用）

它也可以获得 Style Scheme。

确保你理解这些颜色的含义，请看[使用样式方案的注意事项](../doc/n-theme#style-scheme)。

```html
<n-element
  tag="div"
  class="myel"
  style="overflow: auto;"
  v-slot="{ styleScheme }"
>
  <pre
    :style="{
      color: styleScheme.secondaryTextColor,
      transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >
{{ JSON.stringify(styleScheme, 0, 2) }}</pre
  >
</n-element>
```
