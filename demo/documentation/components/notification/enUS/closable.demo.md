# Unclosable
You can make it unclosable.
```html
<n-button @click="notify('info')">
  Unclosable
</n-button>
```
```js
export default {
  methods: {
    notify (type) {
      this.$NNotification.open({
        title: `Close Me if You Can`,
        duration: 2000,
        closable: false,
        onAfterHide: () => {
          this.$NNotification.open({
            title: `Ha Ha Ha Ha!`,
            duration: 2000,
            closable: false,
            onAfterHide: () => {
              this.$NNotification.open({
                title: `No, You Can't`,
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