# Use as a Component
Sometimes you may want to use a component.
```html
<n-confirm
  title="Confirm"
  content="Are you sure?" 
  :closable="false"
  negative-text="Cancel"
  positive-text="Submit"
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
/>
```
```js
export default {
  methods: {
    handleNegativeClick () {
      this.$NMessage.waning('Cancel')
      this.isActive = false
    },
    handlePositiveClick () {
      this.$NMessage.success('Confirm')
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