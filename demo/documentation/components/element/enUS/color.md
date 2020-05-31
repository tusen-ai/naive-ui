# Style Scheme
It can also access style scheme.
```html
<n-element as="div" class="myel" style="overflow: auto;" v-slot="{ styleScheme }">
  <pre
    :style="{
      color: styleScheme.secondaryTextColor,
      transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
</n-element>
```