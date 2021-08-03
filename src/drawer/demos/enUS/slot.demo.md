# Custom header and bottom information

```html
<n-button-group>
  <n-button @click="activate">Open</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502">
  <n-drawer-content>
    <template #header>
      <n-tabs v-model:value="tabsActive" @update:value="updateValue">
        <n-tab-pane name="messages" tab="Messages" />
        <n-tab-pane name="notifications" tab="Notifications" />
      </n-tabs>
    </template>
    <template #footer>
      <n-button>Mark all as read</n-button>
    </template>
    <p v-if="tabsActive === 'messages'">Message content</p>
    <p v-else>Notification content</p>
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
