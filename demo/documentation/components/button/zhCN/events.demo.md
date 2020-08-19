# 事件
处理按钮的事件。
```html
<n-button @click="handleClick">
  点它
</n-button>
```

```js
export default {
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      this.$NMessage.info('Button Clicked')
    }
  }
}
```
