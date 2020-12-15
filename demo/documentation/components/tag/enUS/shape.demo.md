# Shape

Round tag looks like a capsule.

```html
<n-space>
  <n-tag closable size="small" round @close="handleClose"> Real Love </n-tag>
  <n-tag type="success" size="large" round closable @close="handleClose">
    Yes It Is
  </n-tag>
  <n-tag type="warning" closable round @close="handleClose"> I'm Down </n-tag>
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
