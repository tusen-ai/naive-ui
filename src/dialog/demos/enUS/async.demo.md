# Async

Dialog can be async.

```html
<n-button @click="handleClick"> Success </n-button>
```

```js
import { useDialog } from 'naive-ui'

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const countDown = (second) => `Count down ${second} second`

export default {
  setup () {
    const dialog = useDialog()
    return {
      handleClick (e) {
        const d = dialog.success({
          title: 'Async',
          content: 'Click and count down 3 second',
          positiveText: 'Confirm',
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
