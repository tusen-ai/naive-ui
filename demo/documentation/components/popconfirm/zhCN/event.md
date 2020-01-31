# 事件
`positive-click` & `negative-click`
```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:activator>
    <n-button>退出游戏</n-button>
  </template>
  我看 B 站的时候，听说有些冲钱也是找罪受。
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