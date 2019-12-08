# Scrollable
If there are too many notifications, you can scroll them. However they will overlay a bit more area than them look, which will block some mouse events near notifications. If you don't want the feature, you can turn it off easily.

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.
```html
<n-button @click="handleClick(true)">scrollable</n-button>
<n-button @click="handleClick(false)">unscrollable</n-button>
```
```js
export default {
  methods: {
    handleClick (scrollable) {
      this.$NNotification.scrollable = scrollable
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```