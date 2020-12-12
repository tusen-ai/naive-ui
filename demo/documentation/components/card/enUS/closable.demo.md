# Closable

You may need when use it in modal.

```html
<n-card title="Card" closable @close="handleClose"> Card Content </n-card>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleClose () {
      this.message.info('Card Close')
    }
  }
}
```

```css
.n-card {
  max-width: 300px;
}
```
