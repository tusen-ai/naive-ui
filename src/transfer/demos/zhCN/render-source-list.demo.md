# 自定义列表

```html
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
  :renderSourceList="renderSourceList"
  filterable
/>
```

```js
import { defineComponent, ref, h } from 'vue'
import { repeat } from 'seemly'
import { NTree } from 'naive-ui'

function createLabel (level) {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const value = '' + baseKey + level + index
    return {
      label: createLabel(level),
      value,
      children: createData(level - 1, value)
    }
  })
}

function flattenTree (list) {
  const result = []
  function flatten (_list = []) {
    _list.forEach((item) => {
      result.push(item)
      flatten(item.children)
    })
  }
  flatten(list)
  return result
}

export default defineComponent({
  setup () {
    return {
      options: flattenTree(createData()),
      value: ref([]),
      renderSourceList: function ({ onCheck, checkedOptions, pattern }) {
        return h(NTree, {
          keyField: 'value',
          checkable: true,
          data: createData(),
          pattern,
          checkedKeys: checkedOptions.map((i) => i.value),
          onUpdateCheckedKeys: function (_, option) {
            onCheck(option.map((i) => i.value))
          }
        })
      }
    }
  }
})
```
