# Size
```html
<n-tag
  closable
  size="small"
  round
  @close="handleClose"
>
  Real Love
</n-tag>
<n-tag
  type="success"
  size="large"
  round
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
  round
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