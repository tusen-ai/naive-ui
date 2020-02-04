# 触发方式
可以是 `hover` 或者 `click`。
```html
<n-cascader
  v-model="value"
  placeholder="请选些什么"
  :options="options"
  expand-trigger="click"
/>
<n-cascader
  v-model="value"
  placeholder="请选些什么"
  :options="options"
  expand-trigger="hover"
/>
```
```js
function genOptions (depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, '' + i)
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0

      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default {
  data () {
    return {
      value: null,
      options: genOptions()
    }
  }
}
```

```css
.n-cascader {
  margin-bottom: 12px;
}
```
