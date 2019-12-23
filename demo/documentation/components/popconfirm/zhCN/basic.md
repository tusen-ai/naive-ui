# 基本用法
```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template v-slot:activator>
    <n-button>引用</n-button>
  </template>
  一切都将一去杳然，任何人都无法将其捕获。
</n-popconfirm>
```
```js
export default {
  methods: {
    handlePositiveClick () {
      this.$NMessage.success('是的')
    },
    handleNegativeClick () {
      this.$NMessage.warning('并不')
    }
  }
}
```