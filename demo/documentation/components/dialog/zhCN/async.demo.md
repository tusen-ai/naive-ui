# 异步
对话框可以异步。
```html
<n-button @click="handleClick">
  成功
</n-button>
```

```css
.n-button {
  margin: 0 12px 8px 0;
}
```

```js
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))
const countDown = second => `倒计时 ${second} 秒`

export default {
  inject: [
    'dialog'
  ],
  methods: {
    handleClick(e) {
      const dialog = this.dialog.success({
        title: '异步',
        content:
          '点击，倒计时 3 秒',
        positiveText: '确认',
        onPositiveClick: () => {
          dialog.loading = true
          return new Promise(resolve => {
            sleep()
              .then(() => { dialog.content = countDown(2); return sleep() })
              .then(() => { dialog.content = countDown(1); return sleep() })
              .then(() => { dialog.content = countDown(0) })
              .then(resolve)
          })
        }
      })
    }
  }
}
```
