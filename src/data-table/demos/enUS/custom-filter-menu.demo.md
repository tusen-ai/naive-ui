# Custom filter menu

```html
<n-data-table :columns="cols" :data="data" />
```

```js
import { defineComponent, h, ref, reactive } from 'vue'
import { NButton, NSpace } from 'naive-ui'

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

export default defineComponent({
  setup () {
    const filterOptionValueRef = ref(null)

    const colsReactive = reactive([
      {
        title: 'Left',
        key: 'Left'
      },
      {
        title: 'Right',
        key: 'Right',
        filter: 'default',
        filterOptionValue: filterOptionValueRef,
        renderFilterMenu: ({ hide }) => {
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
                      hide()
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
      cols: colsReactive,
      data
    }
  }
})
```
