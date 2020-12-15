# 基础用法

模态框的基础用法，你可以把任何东西放进去，比如一个卡片。

```html
<n-button @click="showModal = true"> 来吧 </n-button>
<n-modal v-model:show="showModal">
  <n-card style="width: 600px;" title="模态框" :bordered="false" size="huge">
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
