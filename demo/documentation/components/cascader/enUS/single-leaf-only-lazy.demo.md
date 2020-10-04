# Async Single (Leaf Only)
```html
<n-cascader
  v-model:value="value"
  placeholder="Please Select Something"
  remote
  :on-load="handleLoad"
/>
```
```js
function genChildren (option) {
  const children = []
  const label = option.label || 'root'
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: label + '_' + i,
      value: label + '_' + i,
      isLeaf: option.depth === 3
    })
  }
  return children
}

export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    handleLoad (option, resolve) {
      window.setTimeout(() => {
        resolve(genChildren(option))
      }, 1000)
    }
  }
}
```