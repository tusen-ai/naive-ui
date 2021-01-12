# 基础

获得当前命名空间。

```html
<n-config-consumer @namespace-change="handleNamespaceChange">
  <template #="{ namespace }">
    <div>
      <div>命名空间：{{ namespace }}</div>
    </div>
  </template>
</n-config-consumer>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleNamespaceChange (value, oldValue) {
      this.message.info('Namespace Change: `' + value + '` namespace')
    }
  }
}
```
