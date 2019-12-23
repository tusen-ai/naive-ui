# Basic
```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:activator>
    <n-button>Quote</n-button>
  </template>
  Things pass us by. Nobody can catch them. That's the way we live our lives.
</n-popconfirm>
```
```js
export default {
  methods: {
    handlePositiveClick () {
      this.$NMessage.success('Yes')
    },
    handleNegativeClick () {
      this.$NMessage.warning('No')
    }
  }
}
```