# Single (Async)
```html
<n-space vertical align="stretch">
  <n-space>
    <n-space><n-switch v-model:value="leafOnly" />Leaf Only</n-space>
    <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
  </n-space>
  <n-space>
    <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
  </n-space>
  <n-cascader
    v-model:value="value"
    placeholder="Meaningless values"
    :options="options"
    :cascade="cascade"
    :leaf-only="leafOnly"
    :show-path="showPath"
    remote
    :on-load="handleLoad"
  />
</n-space>
```

```js
function genChildren (option) {
  const children = []
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: option.label + '-' + i,
      value: option.label + '-' + i,
      depth: option.depth + 1,
      isLeaf: option.depth === 3
    })
  }
  return children
}

const options = [
  {
    label: 'l-0',
    value: 'v-0',
    depth: 1,
    isLeaf: false
  }
]

export default {
  data () {
    return {
      leafOnly: true,
      cascade: true,
      showPath: true,
      value: null,
      options: options
    }
  },
  methods: {
    handleLoad (option) {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          option.children = genChildren(option)
          resolve()
        }, 1000)
      })
    }
  }
}
```
