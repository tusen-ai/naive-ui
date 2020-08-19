# 异步
确认可以异步。
```html
<n-button @click="handleClick">
  成功
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
        title: '异步',
        content:
          '点击，倒计时 3 秒',
        positiveText: '确认',
        onPositiveClick: () => {
          confirmInstance.loading = true
          this.$NMessage.success('倒计时 3 秒')
          return new Promise(resolve => window.setTimeout(() => resolve(true), 3000))
        }
      })
    }
  }
}
```
