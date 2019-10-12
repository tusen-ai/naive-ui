# Theme
Set theme of inner components of app.
```html
<n-app :theme="theme">
  <n-button @click="theme = 'dark'">Dark</n-button>
  <n-button @click="theme = 'light'">Light</n-button>
</n-app>
```
```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```