# 图标

```html
<n-button @click="createMessage"> 漏斗图标 </n-button>
```

```js
import { h } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { MdHourglass } from '@vicons/ionicons4'

export default {
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.warning("I never needed anybody's help in any way", {
          icon: () => h(NIcon, null, { default: () => h(MdHourglass) })
        })
      }
    }
  }
}
```
