# Icon

```html
<n-button @click="createMessage"> Hourglass Icon </n-button>
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
          icon: () => h(NIcon, { default: () => h(MdHourglass) })
        })
      }
    }
  }
}
```
