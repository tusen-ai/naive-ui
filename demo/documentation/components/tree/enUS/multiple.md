# Select Multiple Nodes
Set `multiple` to select multiple nodes.
```html
<n-tree
  multiple
  block-node
  :data="data"
/>
<n-divider />
<n-tree
  multiple
  block-node
  :data="data"
  v-model="value"
/>
```
```js
function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array
    .apply(null, { length: 6 - level })
    .map((_, index) => {
      const key = '' + baseKey + level + index
      return {
        label: createLabel(level),
        key,
        children: createData(level - 1, key)
      }
    })
}

function createLabel (level) {
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
}

export default {
  data () {
    return {
      data: createData(),
      value: []
    }
  }
}
```