# Type
```html
<n-space>
  <n-button @click="notify('info')">
    Info
  </n-button>
  <n-button @click="notify('success')">
    Success
  </n-button>
  <n-button @click="notify('warning')">
    Warning
  </n-button>
  <n-button @click="notify('error')">
    Error
  </n-button>
</n-space>
```
```js
export default {
  inject: ['notification'],
  methods: {
    notify (type) {
      this.notification[type]({
        content: `What to say?`,
        meta: 'I don\'t know'
      })
    }
  }
}
```
