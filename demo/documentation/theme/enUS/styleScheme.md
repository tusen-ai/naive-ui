# Use Style Scheme
Naive UI has a built-in style scheme. It's powerful for you to create Naive UI styled component. `n-config-consumer` & `n-element` have access to style scheme.
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
<n-element as="div"style="overflow: auto;" v-slot="{ styleScheme }">
  <pre
    :style="{
      color: styleScheme.secondaryTextColor,
      transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >{{ JSON.stringify(styleScheme, 0, 2) }}</pre>
</n-element>
```