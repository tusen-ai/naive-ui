# 样式方案
Naive UI 有内置的一组样式变量，你可以使用它来完成和 Naive UI 组件风格一致的组件。
```html
<div style="overflow: auto;">
  <n-config-consumer v-slot="{ styleScheme }">
    <pre
      :style="{
        color: styleScheme.secondaryTextColor,
        transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
      }"
    >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
  </n-config-consumer>
</div>
```
