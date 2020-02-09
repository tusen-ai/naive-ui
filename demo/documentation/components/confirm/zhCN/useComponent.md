# 使用组件
有的时候你可能想把它用作一个组件
```html
<n-confirm
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
  methods: {
    handleNegativeClick () {
      this.$NMessage.warning('取消')
      this.isActive = false
    },
    handlePositiveClick () {
      this.$NMessage.success('确认')
      this.isActive = false
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```