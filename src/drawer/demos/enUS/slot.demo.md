# Custom header and bottom information

```html
<n-button-group>
  <n-button @click="activate">open</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502">
  <n-drawer-content #header>
    <n-button>header</n-button>
    <p>Scroll down.</p>
  </n-drawer-content>
  <n-drawer-content #footer>
    <n-button>footer</n-button>
  </n-drawer-content>
</n-drawer>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const active = ref(false)
    const activate = () => {
      active.value = true
    }
    return {
      active,
      activate
    }
  }
})
```
