# 自定义头部和底部信息

```html
<n-button-group>
  <n-button @click="activate">打开</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502">
  <n-drawer-content #header>
    <n-button>头部</n-button>
    <p>向下滚动</p>
  </n-drawer-content>
  <n-drawer-content #footer>
    <n-button>底部</n-button>
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
