# 基础用法
```html
<n-button @click="handleStart">
  开始
</n-button>
<n-button @click="handleFinish">
  结束
</n-button>
<n-button @click="handleError">
  报个错
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