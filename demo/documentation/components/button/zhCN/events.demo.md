# 事件

处理按钮的事件。

```html
<n-button @click="handleClick"> 点它 </n-button>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleClick () {
      this.message.info('Button Clicked')
    }
  }
}
```
