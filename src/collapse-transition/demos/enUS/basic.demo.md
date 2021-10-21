# Basic

```html
<n-space vertical>
  <n-switch v-model:value="collapsed">
    <template #checked>Expanded</template>
    <template #unchecked>Collapsed</template>
  </n-switch>
  <n-collapse-transition :collapsed="collapsed">
    "There is no single development, in either technology or management
    technique, which by itself promises even one order of magnitude [tenfold]
    improvement within a decade in productivity, in reliability, in simplicity."
  </n-collapse-transition>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      collapsed: ref(true)
    }
  }
})
```
