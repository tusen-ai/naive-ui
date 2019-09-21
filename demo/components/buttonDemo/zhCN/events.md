# 事件
处理按钮的事件。
```html
<n-button @click="handleClick">
  Click Me
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
