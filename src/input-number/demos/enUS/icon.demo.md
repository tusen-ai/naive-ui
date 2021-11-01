# Prefix & suffix

Add prefix and suffix contents.

```html
<n-space vertical>
  <n-input-number v-model:value="value">
    <template #prefix>$</template>
  </n-input-number>
  <n-input-number v-model:value="value">
    <template #suffix>%</template>
  </n-input-number>
  <n-input-number :show-button="false" v-model:value="value">
    <template #suffix>%</template>
  </n-input-number>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
```
