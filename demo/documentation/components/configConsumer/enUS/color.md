# Style Scheme
Style scheme exposes the style variables used inside naive-ui. You can use it to create same styled components of naive-ui.
```html
<div style="overflow: auto">
  <n-config-consumer>
    <template v-slot="{ styleScheme }">
      <n-code :code="JSON.stringify(styleScheme, 0, 2)" language="js"></n-code>
    </template>
  </n-config-consumer>
</div>
```