# 可滚动

如果有太多信息，通知的容器是可以滚动的。但是在那种情况下，通知会比他们看起来的多占据一点点空间，会挡住一些通知外面离通知很近的鼠标操作。如果你不想要这个特性，你可以通过设定 `<n-notification-provider :scrollable="false" />` 来使通知不可滚动。

改变这个属性会导致已经存在全部通知被清空，确保你在合适的时机修改了这个属性。

```html
<n-button @click="handleClick">看看这个东西怎么滚动</n-button>
```

```js
export default {
  inject: ['notification'],
  methods: {
    handleClick(scrollable) {
      Array.apply(null, { length: 5 }).forEach((notification) =>
        this.notification.create({
          title: '很多个通知',
          content: `试着滚起来
试着滚起来
试着滚起来
试着滚起来
试着滚起来
试着滚起来
试着滚起来`
        })
      )
    }
  }
}
```
