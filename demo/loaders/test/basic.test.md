# Style Scheme

```html
<n-element as="div" class="myel">
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