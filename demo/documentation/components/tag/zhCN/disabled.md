# 禁用 
```html
<n-tag
  closable
  @close="handleClose"
  disabled
>
  爱在西元前
</n-tag>
<n-tag
  type="success"
  closable
  disabled
  @close="handleClose"
>
  不该
</n-tag>
<n-tag
  type="warning"
  closable
  disabled
  @close="handleClose"
>
  超人不会飞
</n-tag>
<n-tag
  type="error"
  closable
  disabled
  @close="handleClose"
>
  手写的从前
</n-tag>
<n-tag
  type="info"
  closable
  disabled
  @close="handleClose"
>
  哪里都是你
</n-tag>
```
```js
export default {
  methods: {
    handleClose () {
      this.$NMessage.info('tag close')
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
