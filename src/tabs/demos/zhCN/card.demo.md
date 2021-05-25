# 卡片类型

设定 `type='card'`。

```html
<n-tabs
  v-model:value="name"
  type="card"
  closable
  @close="handleClose"
  tab-style="min-width: 80px;"
>
  <n-tab-pane
    v-for="panel in panels"
    :key="panel"
    :tab="panel.toString()"
    :name="panel"
  >
    {{ panel }}
  </n-tab-pane>
</n-tabs>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const nameRef = ref(1)
    const message = useMessage()
    const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    function handleClose (name) {
      const { value: panels } = panelsRef
      if (panels.length === 1) {
        message.error('最后一个了')
        return
      }
      message.info('关掉 ' + name)
      const index = panels.findIndex((v) => name === v)
      panels.splice(index, 1)
      if (nameRef.value === name) {
        nameRef.value = panels[index]
      }
    }
    return {
      panels: panelsRef,
      name: nameRef,
      handleClose
    }
  }
})
```
