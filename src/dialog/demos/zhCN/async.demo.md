# 异步

对话框可以异步。

```html
<n-button @click="handleClick"> 成功 </n-button>
```

```js
import { useDialog } from 'naive-ui'

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const countDown = (second) => `倒计时 ${second} 秒`

export default {
  inject: ['dialog'],
  setup () {
    const dialog = useDialog()
    return {
      handleClick () {
        const d = dialog.success({
          title: '异步',
          content: '点击，倒计时 3 秒',
          positiveText: '确认',
          onPositiveClick: () => {
            d.loading = true
            return new Promise((resolve) => {
              sleep()
                .then(() => {
                  d.content = countDown(2)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(1)
                  return sleep()
                })
                .then(() => {
                  d.content = countDown(0)
                })
                .then(resolve)
            })
          }
        })
      }
    }
  }
}
```
