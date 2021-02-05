# 类型

```html
<n-space>
  <n-button @click="notify('info')"> 信息 </n-button>
  <n-button @click="notify('success')"> 成功 </n-button>
  <n-button @click="notify('warning')"> 警告 </n-button>
  <n-button @click="notify('error')"> 错误 </n-button>
</n-space>
```

```js
import { useNotification } from 'naive-ui'

export default {
  setup () {
    const notification = useNotification()
    return {
      notify (type) {
        notification[type]({
          content: '说点啥呢',
          meta: '想不出来'
        })
      }
    }
  }
}
```
