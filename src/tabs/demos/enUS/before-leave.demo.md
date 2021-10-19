# Hook function before switching tab

```html
<n-tabs
  type="line"
  @before-leave="handleBeforeLeave"
  @update:value="handleUpdateValue"
>
  <n-tab-pane name="oasis" tab="Oasis">Wonderwall</n-tab-pane>
  <n-tab-pane name="the beatles" tab="the Beatles">Hey Jude</n-tab-pane>
  <n-tab-pane name="jay chou" tab="My Favour">My faviur</n-tab-pane>
</n-tabs>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
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
