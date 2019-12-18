# Style Scheme

```html
<n-element as="span" class="myel">
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