# 样式方案

```html
<n-config-consumer>
  <template v-slot="{ styleScheme }">
    <n-code :code="JSON.stringify(styleScheme, 0, 2)" language="js"></n-code>
  </template>
</n-config-consumer>
```
