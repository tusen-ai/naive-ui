# 使用 Card 预设
模态框有一些预设，让你在设定之后可以使用对应的 slots 还有 props。
```html
<n-button
  @click="show"
>
  来吧
</n-button>
<n-modal
  v-model:show="showModal"
  preset="card"

  :body-style="bodyStyle"
  title="卡片预设"
  size="huge"
  :bordered="false"
  :segmented="segmented"
  @close="hide"
>
  <template v-slot:header-extra>
    噢!
  </template>
  内容
  <template v-slot:footer>
    尾部
  </template>
</n-modal>
```
```js
export default {
  data () {
    return {
      showModal: false,
      bodyStyle: {
        width: '600px'
      },
      segmented: {
        content: 'soft',
        footer: 'soft'
      }
    }
  },
  methods: {
    show () {
      this.showModal = true
    },
    hide () {
      this.showModal = false
    }
  }
}
```