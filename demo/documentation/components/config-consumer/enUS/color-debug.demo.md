# Style Scheme (Deprecated)

Style scheme exposes the style variables used inside naive-ui. You can use it to create same styled components of naive-ui.

To make sure you know what do these colors mean. See [Caveat on Using Style Scheme](../doc/n-theme#style-scheme).

```html
<div style="overflow: auto;">
  <n-config-consumer #="{ styleScheme }">
    <pre
      :style="{
        color: styleScheme.secondaryTextColor,
        transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
      }"
    >
{{ JSON.stringify(styleScheme, 0, 2) }}</pre
    >
  </n-config-consumer>
</div>
```
