# Basic

```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:trigger>
    <n-button>Quote</n-button>
  </template>
  Things pass us by. Nobody can catch them. That's the way we live our lives.
</n-popconfirm>
```

```js
export default {
  inject: ['message'],
  methods: {
    handlePositiveClick () {
      this.message.success('Yes')
    },
    handleNegativeClick () {
      this.message.warning('No')
    }
  }
}
```
