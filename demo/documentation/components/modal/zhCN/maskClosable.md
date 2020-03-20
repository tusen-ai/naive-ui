# 遮罩关闭
你可以在使用 v-model 的时候让点击遮罩不关闭
```html
<n-button
  @click="modalActive = true"
>
  来吧
</n-button>
<n-modal
  v-model="modalActive" 
  :mask-closable="false"
  preset="confirm" 
  title="确认"
  content="你确认" 
  :closable="false"
  positive-text="确认"
  @positive-click="submitCallback"
  @negative-click="cancelCallback"
  negative-text="算了"
/>
```
```js
export default {
  data () {
    return {
      modalActive: false,
    }
  },
  methods: {
    cancelCallback () {
      this.$NMessage.success('算了')
      this.modalActive = false
    },
    submitCallback () {
      this.$NMessage.success('确认')
      this.modalActive = false
    }
  }
}
```