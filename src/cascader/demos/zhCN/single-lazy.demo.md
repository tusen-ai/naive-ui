# 单项（异步）

```html
<n-space vertical>
  <n-space>
    <n-space
      ><n-switch v-model:value="checkStrategyIsChild" />Child Check
      Strategy</n-space
    >
    <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
    <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
  </n-space>
  <n-cascader
    v-model:value="value"
    placeholder="没啥用的值"
    :options="options"
    :cascade="cascade"
    :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
    :show-path="showPath"
    remote
    :on-load="handleLoad"
  />
</n-space>
```

```js
function getChildren (option) {
  const children = []
  for (let i = 0; i <= option.depth; ++i) {
    children.push({
      label: option.label + '-' + i,
      value: option.value + '-' + i,
      depth: option.depth + 1,
      isLeaf: option.depth === 3
    })
  }
  return children
}

export default {
  data () {
    return {
      options: [
        {
          label: 'l-0',
          value: 'v-0',
          depth: 1,
          isLeaf: false
        }
      ],
      checkStrategyIsChild: true,
      cascade: true,
      showPath: true,
      value: null
    }
  },
  methods: {
    handleLoad (option) {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          option.children = getChildren(option)
          resolve()
        }, 1000)
      })
    }
  }
}
```
