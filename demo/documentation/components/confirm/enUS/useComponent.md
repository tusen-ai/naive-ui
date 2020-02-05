# Use as a Component
Sometimes you may want to use a component.
```html
<n-confirm
  title="Confirm"
  content="Are you sure?" 
  :closable="false"
  positive-text="Submit"
  @positive-click="submitCallback"
  @negative-click="cancelCallback"
  negative-text="Cancel">
</n-confirm>
```
```js
export default {
  methods: {
    cancelCallback () {
      this.$NMessage.waning('Cancel')
      this.isActive = false
    },
    submitCallback () {
      this.$NMessage.success('Submit')
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