# Style Scheme
Style scheme exposes the style variables used inside naive-ui. You can use it to create same styled components of naive-ui.
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