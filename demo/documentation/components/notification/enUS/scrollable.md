# Scrollable
If there are too many notifications, you can make them scrollable by setting `$NNotification.scrollable = true`. However, in that case they will overlay a bit more area than them look, which will block some mouse events near notifications. If you don't want the feature, simply not set it.

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.
```html
<n-button @click="handleClick(true)">Scrollable(Open some notifications after click)</n-button>
<n-button @click="handleClick(false)">Unscrollable</n-button>
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