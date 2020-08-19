# 基础用法
```html
<n-button @click="emitInfo">
  信息
</n-button>
<n-button @click="emitError">
  错误
</n-button>
<n-button @click="emitWarning">
  警告
</n-button>
<n-button @click="emitSuccess">
  成功
</n-button>
<n-button @click="emitLoading">
  加载中
</n-button>
```
```js
export default {
  data() {
    return {}
  },
  methods: {
    emitInfo() {
      this.$NMessage.info(
        "I don't know why nobody told you how to unfold your love"
      )
    },
    emitError() {
      this.$NMessage.error("Once upon a time you dressed so fine")
    },
    emitWarning() {
      this.$NMessage.warning("How many roads must a man walk down")
    },
    emitSuccess() {
      this.$NMessage.success(
        "'Cause you walked hand in hand With another man in my place"
      )
    },
    emitLoading() {
      this.$NMessage.loading(
        "If I were you, I will realize that I love you more than any other guy"
      )
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```