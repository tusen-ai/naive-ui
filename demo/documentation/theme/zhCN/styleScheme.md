# 使用样式方案
Naive UI 有一组内置的样式方案，对创建一个 Naive UI 相同风格的组件时很有帮助。配置消费者 `n-config-consumer` 和元素 `n-element` 可以读取样式方案。
```html
<n-config-consumer>
  <template v-slot="{ styleScheme }">
    <button
      :style="{
        fontSize: '14px',
        padding: '8px',
        borderColor: styleScheme.primaryColor,
        backgroundColor: 'transparent',
        color: styleScheme.warningColor,
        transition: `all .3s ${styleScheme.easeInOutCubicBezier}`
      }"
    >Cool!</button>
  </template>
</n-config-consumer>
<br>
<n-element as="div"style="overflow: auto;">
  <template v-slot="{ styleScheme }">
    <pre
      :style="{
        color: styleScheme.secondaryTextColor,
        transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
      }"
    >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
  </template>
</n-element>
```