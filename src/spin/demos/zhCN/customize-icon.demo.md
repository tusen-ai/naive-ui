# 自定义图标

```html
<n-space vertical>
  <n-spin size="small" >
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
  </n-spin>
  <n-spin :show="show">
    <n-alert title="La La La" type="success">
    明天再打开行李箱。宝贝，挂电话啦。
    </n-alert>
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
  </n-spin>
  <n-button @click="show = !show">点出来加载</n-button>
</n-space>
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
