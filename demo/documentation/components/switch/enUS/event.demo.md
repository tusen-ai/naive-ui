# Event

```html
<n-switch v-model:value="active" @update:value="handleChange" />
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      active: false
    }
  },
  methods: {
    handleChange(value) {
      this.message.info(`Update value: ${value}`)
    }
  }
}
```
