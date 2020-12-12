# Events

Handle events on button.

```html
<n-button @click="handleClick"> Click Me </n-button>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleClick() {
      this.message.info('Button Clicked')
    }
  }
}
```
