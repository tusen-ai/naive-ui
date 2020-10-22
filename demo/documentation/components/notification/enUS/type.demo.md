# Type
```html
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
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
