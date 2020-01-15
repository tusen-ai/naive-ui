# 过滤
```html
<n-cascader
  v-model="value1"
  placeholder="可过滤多项（仅叶子节点）"
  :options="options"
  filterable
  :filter="filter1"
  multiple
  style="margin-bottom:10px;"
/>
<n-cascader
  v-model="value2"
  placeholder="可过滤多项"
  :options="options"
  filterable
  :filter="filter2"
  multiple
  :leaf-only="false"
  style="margin-bottom:10px;"
/>
<n-cascader
  v-model="value3"
  placeholder="可过滤单项（仅叶子节点）"
  :options="options"
  filterable
  :filter="filter3"
  style="margin-bottom:10px;"
/>
<n-cascader
  v-model="value4"
  placeholder="可过滤单项"
  :options="options"
  filterable
  :filter="filter4"
  :leaf-only="false"
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
      value1: null,
      options: genOptions(),
      value2: null,
      value3: null,
      value4: null,
    }
  },
  methods: {
    filter1 (pattern, option, path) {
      if (option.label.indexOf(pattern + '-1')>-1) {
        return true
      } else {
        return false
      }
    },
    filter2 (pattern, option, path) {
      if (path[0].label===pattern) {
        return true
      } else {
        return false
      }
    },
    filter3 (pattern, option, path) {
      if (option.label.indexOf(pattern + '-1')>-1) {
        return true
      } else {
        return false
      }
    },
    filter4 (pattern, option, path) {
      if (path[0].label===pattern) {
        return true
      } else {
        return false
      }
    }
  }
}
```
