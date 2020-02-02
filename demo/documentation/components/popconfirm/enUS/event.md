# Event
`positive-click` & `negative-click`
```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:activator>
    <n-button>Quit</n-button>
  </template>
  I heared that players will still be abused after purchasing in some games when I watch Bilibili.
</n-popconfirm>
```
```js
export default {
  methods: {
    handlePositiveClick () {
      this.$NMessage.info('positive click')
    },
    handleNegativeClick () {
      this.$NMessage.info('negative click')
    }
  }
}
```