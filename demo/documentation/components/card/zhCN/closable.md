# 可关闭
```html
<n-card title="卡片" closable @close="handleClose">
  卡片内容
</n-card>
```
```js
export default {
  methods: {
    handleClose () {
      this.$NMessage.info('卡片关闭')
    }
  }
}
```
```css
.n-card {
  max-width: 300px;
}
```
