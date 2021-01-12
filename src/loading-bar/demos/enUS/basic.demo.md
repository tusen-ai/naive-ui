# Basic

```html
<n-space>
  <n-button @click="handleStart"> start </n-button>
  <n-button @click="handleFinish"> finish </n-button>
  <n-button @click="handleError"> error </n-button>
</n-space>
```

```js
export default {
  inject: ['loadingBar'],
  methods: {
    handleStart () {
      this.loadingBar.start()
    },
    handleFinish () {
      this.loadingBar.finish()
    },
    handleError () {
      this.loadingBar.error()
    }
  }
}
```
