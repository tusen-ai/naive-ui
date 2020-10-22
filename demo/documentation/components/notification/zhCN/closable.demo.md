# 不可关闭
通知可以不能被关闭
```html
<n-button @click="handleClick">
  不能关闭
</n-button>
```
```js
export default {
  inject: ['notification'],
  methods: {
    handleClick () {
      const notification = this.notification
      notification.create({
        title: '你能关掉我吗？',
        duration: 2000,
        closable: false,
        onAfterLeave: () => {
          notification.create({
            title: `哈哈哈哈!`,
            duration: 2000,
            closable: false,
            onAfterLeave: () => {
              notification.create({
                title: `你不能`,
                duration: 2000,
                closable: false
              })
            }
          })
        }
      })
    }
  }
}
```
