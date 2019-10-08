# Basic
```html
<n-button @click="handleStart">
  start
</n-button>
<n-button @click="handleFinish">
  finish
</n-button>
<n-button @click="handleError">
  error
</n-button>
```
```js
export default {
  methods: {
    handleStart() {
      this.$NLoadingBar.start();
    },
    handleFinish() {
      this.$NLoadingBar.finish();
    },
    handleError() {
      this.$NLoadingBar.error();
    }
  }
};
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```