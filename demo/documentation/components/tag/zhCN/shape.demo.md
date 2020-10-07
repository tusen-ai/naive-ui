# 形状
圆的 Tag 长得像个胶囊。
```html
<n-tag
  type="success"
  size="small"
  round
  closable
  @close="handleClose"
>
  不该
</n-tag>
<n-tag
  type="error"
  closable
  round
  @close="handleClose"
>
  手写的从前
</n-tag>
<n-tag
  type="error"
  closable
  size="large"
  round
  @close="handleClose"
>
  手写的从前
</n-tag>
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
```css
.n-tag {
  margin-right: 12px;
  margin-bottom: 8px;
}
```