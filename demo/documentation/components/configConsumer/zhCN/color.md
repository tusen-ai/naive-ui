# 样式方案
Naive UI 有内置的一组样式变量，你可以使用它来完成和 Naive UI 组件风格一致的组件。
```html
<div style="overflow: auto;">
  <n-config-consumer>
    <template v-slot="{ styleScheme }">
      <n-code :code="JSON.stringify(styleScheme, 0, 2)" language="js"></n-code>
    </template>
  </n-config-consumer>
</div>
```
