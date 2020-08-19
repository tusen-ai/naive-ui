# Search
Tree accept `pattern` and `filter` to do searching.
```html
<n-input v-model="pattern" placeholder="Search" />
<n-tree
  :pattern="pattern"
  :data="data"
  block-node
/>
```
```js
function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array
    .apply(null, { length: 2 })
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
      pattern: ''
    }
  }
}
```
```css
.n-input {
  margin-bottom: 12px;
}
```