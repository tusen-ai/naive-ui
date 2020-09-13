# 受控显示
模态框的显示可以是受控的。
```html
<n-button
  @click="handleClick"
>
  来吧
</n-button>
<n-modal :show="showModal">
  <n-card
    style="width: 600px;"
    title="模态框"
    size="huge"
    :bordered="false"
  >
    倒计时 {{ timeout / 1000 }} 秒
  </n-card>
</n-modal>
```
```js
export default {
  data () {
    return {
      showModal: false,
      timeout: 6000
    }
  },
  methods: {
    handleClick () {
      this.showModal = true
      this.timeout = 6000
      const countdown = () => {
        if (this.timeout <= 0) {
          this.showModal = false
        } else {
          this.timeout -= 1000
          setTimeout(countdown, 1000)
        }
      }
      countdown()
    }
  }
}
```