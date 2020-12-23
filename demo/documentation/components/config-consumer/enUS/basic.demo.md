# Basic

Get current theme and namespace.

```html
<n-config-consumer
  @theme-change="handleThemeChange"
  @namespace-change="handleNamespaceChange"
>
  <template #="{ theme, namespace }">
    <div>
      <div>theme: {{ theme }}</div>
      <div>namespace: {{ namespace }}</div>
    </div>
  </template>
</n-config-consumer>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleThemeChange (value, oldValue) {
      this.message.info('Theme Change: `' + value + '` theme')
    },
    handleNamespaceChange (value, oldValue) {
      this.message.info('Namespace Change: `' + value + '` namespace')
    }
  }
}
```
