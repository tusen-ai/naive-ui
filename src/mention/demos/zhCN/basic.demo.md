# 基本用法

```html
<n-mention :options="options" default-value="@" />
```

```js
import { defineComponent } from 'vue'

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
          label: '颐和园路5号',
          value: '颐和园路5号'
        }
      ]
    }
  }
})
```
