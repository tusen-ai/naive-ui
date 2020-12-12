# 图标

```html
<n-button @click="createMessage"> 漏斗图标 </n-button>
```

```js
import { h } from 'vue'
import { MdHourglass } from '@vicons/ionicons-v4'

export default {
  inject: ['message'],
  methods: {
    createMessage () {
      this.message.warning("I never needed anybody's help in any way", {
        icon: () => h(MdHourglass)
      })
    }
  }
}
```
