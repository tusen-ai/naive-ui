# Size
Why using a round tag? Maybe when you want everything looks like a pill.
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
  round
  @close="handleClose"
>
  I'm Down
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