# Size
Cascader can be `small` or `medium` or `large` size.
```html
<n-cascader
  v-model="value"
  placeholder="Please Select Something"
  :options="options"
  :leaf-only="false"
  size="small"
/>
<n-cascader
  v-model="value"
  placeholder="Please Select Something"
  :options="options"
  :leaf-only="false"
  size="medium"
/>
<n-cascader
  v-model="value"
  placeholder="Please Select Something"
  :options="options"
  :leaf-only="false"
  size="large"
/>
```
```js
function genOptions (depth = 2, iterator = 1, prefix = '') {
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
  margin-bottom: 8px;
}
```