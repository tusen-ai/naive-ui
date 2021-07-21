# 自定义图标

# 自定义图标

```html
<n-spin :show="show" #icon>
  <n-icon>
    <Reload />
  </n-icon>
</n-spin>
```

```js
import { ref, defineComponent } from 'vue'
import { Reload } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Reload
  },
  setup () {
    return {
      show: ref(false)
    }
  }
})
```
