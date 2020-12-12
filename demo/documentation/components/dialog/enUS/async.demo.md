# Async

Dialog can be async.

```html
<n-button @click="handleClick"> Success </n-button>
```

```css
.n-button {
  margin: 0 12px 8px 0;
}
```

```js
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const countDown = (second) => `Count down ${second} second`

export default {
  inject: ['dialog'],
  methods: {
    handleClick (e) {
      const dialog = this.dialog.success({
        title: 'Async',
        content: 'Click and count down 3 second',
        positiveText: 'Confirm',
        onPositiveClick: () => {
          dialog.loading = true
          return new Promise((resolve) => {
            sleep()
              .then(() => {
                dialog.content = countDown(2)
                return sleep()
              })
              .then(() => {
                dialog.content = countDown(1)
                return sleep()
              })
              .then(() => {
                dialog.content = countDown(0)
              })
              .then(resolve)
          })
        }
      })
    }
  }
}
```
