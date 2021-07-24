# Render Label

If you use `render-label` batch rendering, input matching will be performed according to `value`.

```html
<n-mention :options="options" :render-label="renderLabel" />
```

```js
import { defineComponent, h } from 'vue'
import { NIcon } from 'naive-ui'
import { HappyOutline as HappyIcon } from '@vicons/ionicons5'

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
          label: 'amadeus711',
          value: 'amadeus711'
        }
      ],
      renderLabel: (option) =>
        h('div', { style: 'display: flex; align-items: center;' }, [
          h(
            NIcon,
            { style: 'margin-right: 5px' },
            { default: () => h(HappyIcon) }
          ),
          option.value
        ])
    }
  }
})
```
