# Style Scheme

```html
<n-element tag="div" class="myel">
  <template #="{ styleScheme }">
    <pre
      :style="{
        color: styleScheme.secondaryTextColor,
        transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
      }"
    >
{{ JSON.stringify(styleScheme, 0, 2) }}</pre
    >
  </template>
</n-element>
```
