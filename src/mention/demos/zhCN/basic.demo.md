# 基本用法

如果 `label` 是回调函数，输入匹配则会根据 `value` 进行匹配

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
          label: '广东路',
          value: '广东路'
        },
        {
          label: (option) =>
            h('span', null, [
              h(
                NIcon,
                { style: 'margin-right: 5px' },
                { default: () => h(HomeIcon) }
              ),
              option.value
            ]),
          value: '颐和园路5号'
        }
      ]
    }
  }
})
```
