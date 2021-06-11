# Rtl Debug

```html
<n-space vertical>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
    <n-button>Rtl Test</n-button>
  </n-config-provider>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { unstableButtonRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableButtonRtl]
    }
  }
})
```
