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
  methods: {
    handleNamespaceChange (value, oldValue) {
      console.log('Namespace Change: `' + value + '` namespace')
    }
  }
}
```
