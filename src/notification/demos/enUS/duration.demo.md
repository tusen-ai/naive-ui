# Duration

Auto close.

```html
<n-button @click="handleClick"> Duration: 10000 </n-button>
```

```js
import { useNotification } from 'naive-ui'

export default {
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        let count = 10
        const n = notification.create({
          title: 'What is Pingshan Road + rain ?',
          content: `You have ${count} seconds to answer the question.`,
          duration: 10000,
          closable: false,
          onAfterEnter: () => {
            const minusCount = () => {
              count--
              n.content = `You have ${count} seconds to answer the question.`
              if (count > 0) {
                window.setTimeout(minusCount, 1000)
              }
            }
            window.setTimeout(minusCount, 1000)
          },
          onAfterLeave: () => {
            notification.create({
              title: 'The Answer is Pingshan River!',
              content: 'Oops, that is not even an anti-humor.',
              duration: 10000
            })
          }
        })
      }
    }
  }
}
```
