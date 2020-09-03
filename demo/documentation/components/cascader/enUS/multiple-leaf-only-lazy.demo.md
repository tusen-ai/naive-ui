# Async Multiple (Leaf Only)
```html
<n-cascader
  v-model="value"
  multiple
  placeholder="Please Select Something"
  :options="options"
  style="flex-grow: 1; margin-right: 12px;"
  remote
  :on-load="handleLoad"
/>
```
```js
function genChildren (option) {
  const children = []
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: option.label + '_' + i,
      value: option.label + '_' + i,
      isLeaf: option.depth === 3
    })
  }
  return children
}

const options = [
  {
    label: 'Root',
    value: 'root',
    isLeaf: false
  }
]

export default {
  data () {
    return {
      value: null,
      options: options
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