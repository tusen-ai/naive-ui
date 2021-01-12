# Duration

Auto close.

```html
<n-button @click="handleClick"> Duration: 10000 </n-button>
```

```js
export default {
  inject: ['notification'],
  methods: {
    handleClick () {
      let count = 10
      const notification = this.notification.create({
        title: 'What is Pingshan Road + rain ?',
        content: `You have ${count} seconds to answer the question.`,
        duration: 10000,
        closable: false,
        onAfterEnter: () => {
          const minusCount = () => {
            count--
            notification.content = `You have ${count} seconds to answer the question.`
            if (count > 0) {
              window.setTimeout(minusCount, 1000)
            }
          }
          window.setTimeout(minusCount, 1000)
        },
        onAfterLeave: () => {
          this.notification.create({
            title: 'The Answer is Pingshan River!',
            content: 'Oops, that is not even an anti-humor.',
            duration: 10000
          })
        }
      })
    }
  }
}
```
