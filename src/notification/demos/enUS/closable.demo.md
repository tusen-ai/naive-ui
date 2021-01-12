# Unclosable

You can make it unclosable.

```html
<n-button @click="handleClick"> Unclosable </n-button>
```

```js
export default {
  inject: ['notification'],
  methods: {
    handleClick () {
      const notification = this.notification
      notification.create({
        title: 'Close Me if You Can',
        duration: 2000,
        closable: false,
        onAfterLeave: () => {
          notification.create({
            title: 'Ha Ha Ha Ha!',
            duration: 2000,
            closable: false,
            onAfterLeave: () => {
              notification.create({
                title: "No, You Can't",
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
