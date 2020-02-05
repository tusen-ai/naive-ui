# Async
Confirm can be async.
```html
<n-button @click="handleClick">
  Success
</n-button>
```

```css
.n-button {
  margin: 0 12px 8px 0;
}
```

```js
export default {
  methods: {
    handleClick(e) {
      const confirmInstance = this.$NConfirm.success({
        title: 'Async',
        content:
          'Click and count down 3 second',
        onPositiveClick: hide => {
          confirmInstance.loading = true
          this.$NMessage.success('Count down 3 second')
          window.setTimeout(hide, 3000)
        }
      })
    }
  }
}
```
