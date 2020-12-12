# Change Debug

```html
<n-select
  v-model:value="node"
  :options="[{label: 'a', value: 'a'},{label: 'b', value: 'b'},{label: 'c', value: 'c'}]"
  clearable
  filterable
  :disabled="!editable"
  placeholder="Please Select"
  multiple
  @update:value="nodeChange"
/>
```

```js
export default {
  data() {
    return {
      node: null,
      editable: true
    }
  },
  watch: {
    node(newValue, oldValue) {
      console.log('watch node', newValue === oldValue, newValue, oldValue)
    }
  },
  methods: {
    nodeChange(value) {
      console.log('handle node change', value)
    }
  }
}
```
