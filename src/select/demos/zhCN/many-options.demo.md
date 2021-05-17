# 许多选项

1000 倍宇宙的终极答案个数的选项。

```html
<n-space vertical>
  <n-select v-model:value="value" :options="options" />
  <n-select multiple v-model:value="values" :options="options" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      values: ref(null),
      options: Array.apply(null, { length: 42000 }).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
})
```
