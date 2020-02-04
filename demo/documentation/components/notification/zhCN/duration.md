# 持续时间
自动关闭。
```html
<n-button @click="notify('info')">
  持续时间 10000ms
</n-button>
```
```js
export default {
  methods: {
    notify (type) {
      let count = 10
      const notification = this.$NNotification.open({
        title: `平山道 + 雨 = 什么？`,
        content: `你有 ${count} 秒来回答这个问题`,
        duration: 10000,
        closable: false,
        onAfterShow: () => {
          const minusCount = () => {
            count--
            notification.content = `你有 ${count} 秒来回答这个问题`
            if (count > 0) {
              window.setTimeout(minusCount, 1000)
            }
          }
          window.setTimeout(minusCount, 1000)
        },
        onAfterHide: () => {
          this.$NNotification.open({
            title: `答案是平山河`,
            content: '这其实连个冷笑话都算不上',
            duration: 10000
          })
        }
      })
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```