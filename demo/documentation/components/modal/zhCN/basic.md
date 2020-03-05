# 基础用法
Modal 的基础用法，你可以把任何东西放进去，比如一个卡片。
```html
<n-button
  @click="isActive = true"
>
  来吧
</n-button>
<n-modal v-model="isActive">
  <n-card
    style="width: 600px;"
    title="模态框"
    :bordered="false"
    size="huge"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template v-slot:header-extra>
     噢！
    </template>
    内容
    <template v-slot:footer>
      尾部
    </template>
  </n-card>
</n-modal>
```
```js
export default {
  data () {
    return {
      isActive: false
    }
  }
}
```