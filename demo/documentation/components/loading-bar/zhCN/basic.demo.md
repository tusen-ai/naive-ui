# 基础用法
```html
<n-space>
  <n-button @click="handleStart">
    开始
  </n-button>
  <n-button @click="handleFinish">
    结束
  </n-button>
  <n-button @click="handleError">
    报个错
  </n-button>
</n-space>
```
```js
export default {
  inject: ['loadingBar'],
  methods: {
    handleStart() {
      this.loadingBar.start()
    },
    handleFinish() {
      this.loadingBar.finish()
    },
    handleError() {
      this.loadingBar.error()
    }
  }
}
```
