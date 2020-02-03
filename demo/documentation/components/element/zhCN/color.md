# 样式方案
它也可以获得 Style Scheme。
```html
<n-element as="div" class="myel" style="overflow: auto;">
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
