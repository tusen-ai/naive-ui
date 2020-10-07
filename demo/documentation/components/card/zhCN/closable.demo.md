# 可关闭
用于 Modal 的时候，你可能需要这个属性。
```html
<n-card title="卡片" closable @close="handleClose">
  卡片内容
</n-card>
```
```js
export default {
  inject: ['message'],
  methods: {
    handleClose () {
      this.message.info('卡片关闭')
    }
  }
}
```
```css
.n-card {
  max-width: 300px;
}
```
