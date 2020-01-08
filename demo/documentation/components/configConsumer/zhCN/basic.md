# 基础
```html
<n-config-consumer
  @theme-change="handleThemeChange"
  @namespace-change="handleNamespaceChange"
>
  <template v-slot="{ theme, namespace }">
    <div>
      <div>主题：{{ theme }}</div>
      <div>命名空间：{{ namespace }}</div>
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
