# Block Node
```html
<n-tree
  :data="data"
  block-node
/>
```
```js
let key = 0

function genData (layer = 2, depth = 0, prefix = '') {
  if (layer === depth) return
  const data = []
  const count = 2
  for (let i = 0; i < count; ++i) {
    data.push({
      label: `${prefix}_${i}`,
      key: key++,
      children: genData(layer, depth + 1, `${prefix}_${i}`)
    })
  }
  return data
}

export default {
  data () {
    return {
      data: genData()
    }
  }
}
```