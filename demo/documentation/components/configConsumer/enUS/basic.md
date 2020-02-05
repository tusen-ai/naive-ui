# Basic
Get current theme and namespace.
```html
<n-config-consumer
  @theme-change="handleThemeChange"
  @namespace-change="handleNamespaceChange"
>
  <template v-slot="{ theme, namespace }">
    <div>
      <div>theme: {{ theme }}</div>
      <div>namespace: {{ namespace }}</div>
    </div>
  </template>
</n-config-consumer>
```
```js
export default {
  methods: {
    handleThemeChange (value, oldValue) {
      this.$NMessage.info('Theme Change: `' + value + '` theme')
    },
    handleNamespaceChange (value, oldValue) {
      this.$NMessage.info('Namespace Change: `' + value + '` namespace')
    }
  }
}
```