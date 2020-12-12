# 事件

`positive-click` & `negative-click`

```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:trigger>
    <n-button>退出游戏</n-button>
  </template>
  我看 B 站的时候，听说有些游戏冲钱也是找罪受。
</n-popconfirm>
```

```js
export default {
  inject: ['message'],
  methods: {
    handlePositiveClick() {
      this.message.info('positive click')
    },
    handleNegativeClick() {
      this.message.info('negative click')
    }
  }
}
```
