# Size

```html
<n-space>
  <n-tag size="small" closable @close="handleClose"> Real Love </n-tag>
  <n-tag closable @close="handleClose"> Real Love </n-tag>
  <n-tag type="success" size="large" closable @close="handleClose">
    Yes It Is
  </n-tag>
</n-space>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleClose () {
      this.message.info('tag close')
    }
  }
}
```
