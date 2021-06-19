# Rtl Debug

```html
<n-space vertical>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
    <n-space>
      <n-tag> 我不配 </n-tag>
      <n-tag type="success" size="small" round closable @close="handleClose">
        梯田
      </n-tag>
      <n-tag type="error" closable round @close="handleClose"> 说好不哭 </n-tag>
      <n-tag type="error" closable size="large" round @close="handleClose">
        一路向北
      </n-tag>
    </n-space>
  </n-config-provider>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { unstableTagRtl } from 'naive-ui'
export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableTagRtl]
    }
  }
})
```
