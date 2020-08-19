# 可滚动
如果有太多信息，你可以通过设定 `$NNotification.scrollable = true` 让他们变得可以滚动。但是在那种情况下，通知会比他们看起来的多占据一点点空间，会挡住一些通知外面离通知很近的鼠标操作。如果你不想要这个特性，什么都不做就好。

改变这个属性会导致已经存在全部通知被清空，确保你在合适的时机修改了这个属性。
```html
<n-button @click="handleClick(true)">可以滚动（点完多开几个通知）</n-button>
<n-button @click="handleClick(false)">不可以滚动</n-button>
```
```js
export default {
  methods: {
    handleClick (scrollable) {
      this.$NNotification.scrollable = scrollable
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```