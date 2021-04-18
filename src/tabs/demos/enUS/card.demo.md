# Card

A example to use with card. (demo is the card)

```html
<n-tabs
  v-model:value="name"
  type="card"
  closable
  @close="handleClose"
  @scrollable-change="handleScrollableChange"
  :nav-style="{
    borderTop: 'none',
    margin: '0 -24px',
    padding: `4px ${tabNavScrollable ? 0 : 24}px`
  }"
>
  <n-tab-pane
    v-for="panel in panels"
    :key="panel"
    :label="panel.toString()"
    :name="panel.toString()"
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
    const message = useMessage()
    const tabNavScrollableRef = ref(false)
    const panelsRef = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    function handleScrollableChange (value) {
      tabNavScrollableRef.value = value
    }
    function handleClose (name) {
      message.info('Close ' + name)
      const index = panelsRef.value.findIndex((v) => name === v.toString())
      if (~index) {
        panelsRef.value.splice(index, 1)
      }
    }
    return {
      panels: panelsRef,
      name: ref('1'),
      tabNavScrollable: tabNavScrollableRef,
      handleScrollableChange,
      handleClose
    }
  }
})
```
