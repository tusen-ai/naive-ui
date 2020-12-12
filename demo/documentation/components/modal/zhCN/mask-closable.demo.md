# 遮罩关闭

使用 `mask-closable=false` 使点击遮罩层不发出关闭事件。

```html
<n-button @click="showModal = true"> 来吧 </n-button>
<n-modal
  :show="showModal"
  :mask-closable="false"
  preset="confirm"
  title="确认"
  content="你确认"
  :closable="false"
  positive-text="确认"
  @positive-click="onPositiveClick"
  @negative-click="onNegativeClick"
  negative-text="算了"
/>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    onNegativeClick () {
      this.message.success('算了')
      this.showModal = false
    },
    onPositiveClick () {
      this.message.success('确认')
      this.showModal = false
    }
  }
}
```
