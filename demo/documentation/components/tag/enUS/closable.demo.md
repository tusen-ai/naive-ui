# Closable
```html
<n-tag
  closable
  @close="handleClose"
>
  Real Love
</n-tag>
<n-tag
  type="success"
  closable
  @close="handleClose"
>
  Yes It Is
</n-tag>
<n-tag
  type="warning"
  closable
  @close="handleClose"
>
  I'm Down
</n-tag>
<n-tag
  type="error"
  closable
  @close="handleClose"
>
  Yesterday
</n-tag>
<n-tag
  type="info"
  closable
  @close="handleClose"
>
  I'm Looking Through You
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