# Disabled
```html
<n-tag
  closable
  @close="handleClose"
  :disabled="disabled"
>
  Real Love
</n-tag>
<n-tag
  type="success"
  closable
  :disabled="disabled"
  @close="handleClose"
>
  Yes It Is
</n-tag>
<n-tag
  type="warning"
  closable
  :disabled="disabled"
  @close="handleClose"
>
  I'm Down
</n-tag>
<n-tag
  type="error"
  closable
  :disabled="disabled"
  @close="handleClose"
>
  Yesterday
</n-tag>
<n-tag
  type="info"
  closable
  :disabled="disabled"
  @close="handleClose"
>
  I'm Looking Through You
</n-tag>
<n-switch v-model="disabled"/>
```
```js
export default {
  methods: {
    handleClose () {
      this.$NMessage.info('tag close')
    }
  },
  data () {
    return {
      disabled: true
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