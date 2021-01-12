# 基础用法

```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template #trigger>
    <n-button>引用</n-button>
  </template>
  一切都将一去杳然，任何人都无法将其捕获。
</n-popconfirm>
```

```js
export default {
  inject: ['message'],
  methods: {
    handlePositiveClick () {
      this.message.success('是的')
    },
    handleNegativeClick () {
      this.message.warning('并不')
    }
  }
}
```
