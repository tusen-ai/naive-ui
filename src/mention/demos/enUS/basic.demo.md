# Basic Usage

If `label` is a render function, the `value` property will be used for matching.

```html
<n-mention :options="options" default-value="@" />
```

```js
import { defineComponent, h } from 'vue'
import { NIcon } from 'naive-ui'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: 'star-kirby',
          value: 'star-kirby'
        },
        {
          label: 'Guandong-Road',
          value: 'Guandong-Road'
        },
        {
          label: (option) =>
            h('span', { style: 'display: flex; align-items: center;' }, [
              h(
                NIcon,
                { style: 'margin-right: 5px' },
                { default: () => h(HomeIcon) }
              ),
              option.value
            ]),
          value: 'No.5-Yiheyuan-Road'
        }
      ]
    }
  }
})
```
