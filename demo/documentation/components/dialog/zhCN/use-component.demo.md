# 使用组件

有的时候你可能想把它用作一个组件。

```html
<n-dialog
  title="确认"
  content="你确定"
  :closable="false"
  negative-text="不确认"
  positive-text="确认"
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
/>
```

```js
export default {
  inject: ['message'],
  methods: {
    handleNegativeClick () {
      this.message.warning('取消')
    },
    handlePositiveClick () {
      this.message.success('确认')
    }
  }
}
```

```css
.n-button {
  margin: 0 12px 8px 0;
}
```
