# Closable
```html
<n-card title="Card" closable @close="handleClose">
  Card Content
</n-card>
```
```js
export default {
  methods: {
    handleClose () {
      this.$NMessage.info('Card Close')
    }
  }
}
```
```css
.n-card {
  max-width: 300px;
}
```