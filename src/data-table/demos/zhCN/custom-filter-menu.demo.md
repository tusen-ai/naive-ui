# 自定义过滤菜单

```html
<n-data-table :columns="cols" :data="data" />
```

```js
import { h, ref, reactive } from 'vue'
import { NButton, NSpace, NIcon } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'

const data = [
  {
    Left: '1',
    Right: '1'
  },
  {
    Left: '2',
    Right: '2'
  }
]

export default {
  setup () {
    const filterOptionValueRef = ref(null)

    const cols = reactive([
      {
        title: 'Left',
        key: 'Left'
      },
      {
        title: 'Right',
        key: 'Right',
        filter: 'default',
        filterOptionValue: filterOptionValueRef,
        renderFilterIcon: () => {
          return h(NIcon, null, { default: () => h(SearchOutline) })
        },
        renderFilterMenu: () => {
          return h(
            NSpace,
            { style: { padding: '12px' }, vertical: true },
            {
              default: () => [
                h(
                  NButton,
                  {
                    onClick: () => {
                      filterOptionValueRef.value = '1'
                    }
                  },
                  { default: () => 'Filter by 1' }
                ),
                h(
                  NButton,
                  {
                    onClick: () => {
                      filterOptionValueRef.value = '2'
                    }
                  },
                  { default: () => 'Filter by 2' }
                ),
                h(
                  NButton,
                  {
                    onClick: () => {
                      filterOptionValueRef.value = null
                    }
                  },
                  { default: () => 'clear' }
                )
              ]
            }
          )
        }
      }
    ])

    return {
      cols,
      data
    }
  }
}
```
