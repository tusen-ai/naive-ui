# Use Style Scheme
Naive UI has a built-in style scheme. It's powerful for you to create Naive UI styled component. `n-config-consumer` & `n-element` have access to style scheme.
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