# Events
Handle events on button.
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
