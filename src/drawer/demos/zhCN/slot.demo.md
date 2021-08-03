# 自定义头部和底部信息

```html
<n-button-group>
  <n-button @click="activate">打开</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502">
  <n-drawer-content>
    <template #header>
      <n-tabs v-model:value="tabsActive" @update:value="updateValue">
        <n-tab-pane name="messages" tab="消息" />
        <n-tab-pane name="notifications" tab="通知" />
      </n-tabs>
    </template>
    <template #footer>
      <n-button>全部标记为已读</n-button>
    </template>
    <p v-if="tabsActive === 'messages'">消息内容</p>
    <p v-else>通知内容</p>
  </n-drawer-content>
</n-drawer>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const active = ref(false)
    const tabsActive = ref('messages')

    const activate = () => {
      active.value = true
    }

    const updateValue = (e) => {
      console.log(e)
    }

    return {
      active,
      tabsActive,
      activate,
      updateValue
    }
  }
})
```
