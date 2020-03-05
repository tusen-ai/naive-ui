# 使用 Card 预设
Modal 有一些预设，让你在设定之后可以使用对应的 Slots 还有 Props。
```html
<n-button
  @click="isActive = true"
>
  来吧
</n-button>
<n-modal
  v-model="isActive"
  preset="card"
  overlay-style="width: 600px;"
  title="卡片预设"
  :bordered="false"
  size="huge"
  :segmented="{
    content: 'soft',
    footer: 'soft'
  }"
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
      isActive: false,
    }
  }
}
```