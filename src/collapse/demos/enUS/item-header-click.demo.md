# Click on Item Header

```html
<n-collapse
  v-model:expandedNames="expandedNames"
  @item-header-click="handleItemHeaderClick"
>
  <n-collapse-item name="1">
    <template #header> Bronze </template>
    <div>Okay</div>
  </n-collapse-item>
  <n-collapse-item name="2">
    <template #header> Silver </template>
    <div>Good</div>
  </n-collapse-item>
  <n-collapse-item name="3">
    <template #header> Gold </template>
    <div>Excellent</div>
  </n-collapse-item>
</n-collapse>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      expandedNames: ref([]),
      handleItemHeaderClick ({ name, expanded }) {
        message.info(`Name: ${name}, Expanded: ${expanded}`)
      }
    }
  }
})
```
