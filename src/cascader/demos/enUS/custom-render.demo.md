# Customizing render

The `render-label` can be used to batch render cascader menu options.

```html
<n-cascader
  v-model:value="value"
  placeholder="Meaningless values"
  :options="options"
  :filterable="true"
  :render-label="renderLabel"
  @update:value="handleUpdateValue"
/>
```

```js
import { defineComponent, ref, h } from 'vue'
import { NTooltip } from 'naive-ui'

function getOptions (depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      options: getOptions(),
      handleUpdateValue (...args) {
        console.log(...args)
      },
      renderLabel (option) {
        return option.disabled
          ? option.label
          : h(NTooltip, null, {
            trigger: () => h('div', null, option.label),
            default: () => 'render - ' + option.label
          })
      }
    }
  }
})
```