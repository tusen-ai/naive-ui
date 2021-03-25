# Basic

Get current namespace.

```html
<n-config-consumer @namespace-change="handleNamespaceChange">
  <template #="{ namespace }">
    <div>
      <div>namespace: {{ namespace }}</div>
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
