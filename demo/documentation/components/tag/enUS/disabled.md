# Disabled
```html
<n-tag
  closable
  @close="handleClose"
  disabled
>
  Real Love
</n-tag>
<n-tag
  type="success"
  closable
  disabled
  @close="handleClose"
>
  Yes It Is
</n-tag>
<n-tag
  type="warning"
  closable
  disabled
  @close="handleClose"
>
  I'm Down
</n-tag>
<n-tag
  type="error"
  closable
  disabled
  @close="handleClose"
>
  Yesterday
</n-tag>
<n-tag
  type="info"
  closable
  disabled
  @close="handleClose"
>
  I'm Looking Through You
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