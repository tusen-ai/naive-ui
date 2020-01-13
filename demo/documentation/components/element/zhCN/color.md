# 样式方案

```html
<n-element as="div" class="myel">
  <template v-slot="{ styleScheme }">
    <pre
      :style="{
        color: styleScheme.textSecondaryColor,
        transition: `color .3s ${styleScheme.cubicBezierEaseInOut}`
      }"
    >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
  </template>
</n-element>
```
