# Use Component
Sometimes you may want to use a component.
```html
<n-confirm
  title="Confirm"
  content="Are you sure?" 
  :closable="false"
  positive-text="submit"
  @positive-click="cancelCallback"
  @negative-click="submitCallback"
  negative-text="cancel">
</n-confirm>
```
```js
export default {
  methods: {
    cancelCallback () {
      this.$NMessage.success('cancel')
      this.isActive = false
    },
    submitCallback () {
      this.$NMessage.success('submit')
      this.isActive = false
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```