# 不可关闭
通知可以不能被关闭
```html
<n-button @click="notify('info')">
  不能关闭
</n-button>
```
```js
export default {
  methods: {
    notify (type) {
      this.$NNotification.open({
        title: `你能关掉我吗？`,
        duration: 2000,
        closable: false,
        onAfterHide: () => {
          this.$NNotification.open({
            title: `哈哈哈哈!`,
            duration: 2000,
            closable: false,
            onAfterHide: () => {
              this.$NNotification.open({
                title: `你不能`,
                duration: 2000,
                closable: false,
              })
            }
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