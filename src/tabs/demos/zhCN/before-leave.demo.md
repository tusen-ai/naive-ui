# 切换标签前的钩子函数

```html
<n-tabs
  type="line"
  @before-leave="handleBeforeLeave"
  @update:value="handleUpdateValue"
>
  <n-tab-pane name="oasis" tab="Oasis"> Oasis </n-tab-pane>
  <n-tab-pane name="oasi11s" tab="Oasis111"> Oasis </n-tab-pane>
  <n-tab-pane name="the beatles" tab="the Beatles">the beatles</n-tab-pane>
  <n-tab-pane name="jay chou" tab="My Favour">My faviur</n-tab-pane>
</n-tabs>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const OasisRef = ref('正在加载中...')
    return {
      Oasis: OasisRef,
      handleBeforeLeave: (tab, oldTab) => {
        if (tab === 'jay chou') message.info('Can not leave!')
        return tab !== 'jay chou'
      },
      handleUpdateValue: (activeName) => {
        message.info(activeName)
      }
    }
  }
})
```
