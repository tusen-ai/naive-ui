# 调整位置

通过固定定位设定 Modal 的位置。

```html
<n-button @click="showModal = true"> 来吧 </n-button>
<n-modal
  v-model:show="showModal"
  style="width: 600px; position: fixed; right: 100px; bottom: 100px;"
>
  <n-card title="模态框" :bordered="false" size="huge">
    <template #header-extra> 噢！ </template>
    内容
    <template #footer> 尾部 </template>
  </n-card>
</n-modal>
```

```js
export default {
  data () {
    return {
      showModal: false
    }
  }
}
```
