# 使用样式方案（弃用）
Naive UI 有一组内置的样式方案，对创建一个 Naive UI 相同风格的组件时很有帮助。配置消费者 `n-config-consumer` 和元素 `n-element` 可以读取样式方案。

如果你看到了 `x-color` 和 `x-overlay-color` 同时存在，那么 `x-color` 是由 `base-background-color` 和 `x-overlay-color` 混合得来的。`x-color` 保证没有透明度，`x-overlay-color` 保证是半透明的。

Naive UI 内部的组件可能会在不同的主题下使用不同的变量作为背景色，因为不同的场景对与透明色和不透明色的需求是不同的。

通常大部分情况下你想使用的是 `x-overlay-color`：例如在暗色模式下使用 `primary-text-color` 会比 `primary-text-overlay-color` 更暗，因为 `primary-text-color` 是在纯黑色混合出来的，但是文字放置的背景色一般比纯黑亮；而在浅色模式下，这两种颜色看起来一般没什么区别，因为 `primary-text-overlay-color` 一般会被放在纯白色的背景。
```html
<n-config-consumer v-slot="{ styleScheme }">
  <button
    :style="{
      fontSize: '14px',
      padding: '8px',
      border: `1px solid ${styleScheme.primaryColor}`,
      outline: 'none',
      backgroundColor: 'transparent',
      color: styleScheme.primaryColor,
      transition: `all .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >Cool!</button>
</n-config-consumer>
<br>
<n-element tag="div" style="overflow: auto;" v-slot="{ styleScheme }">
  <pre
    :style="{
      color: styleScheme.secondaryTextColor,
      transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
</n-element>
```