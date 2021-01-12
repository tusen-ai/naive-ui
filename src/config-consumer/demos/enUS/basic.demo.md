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
  inject: ['message'],
  methods: {
    handleNamespaceChange (value, oldValue) {
      this.message.info('Namespace Change: `' + value + '` namespace')
    }
  }
}
```
