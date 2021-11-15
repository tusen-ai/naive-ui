# 范围

```html
<n-space vertical>
  <n-slider :defaultValue="[50, 70]" range :step="1" />
  <n-slider v-model:value="value" :marks="marks" range :step="1" :onUpdateValue="onChange" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([20, 57, 70]),
      marks: {
        0: '鸭蛋',
        60: '及格',
        90: '优秀'
      },
      onChange: (value) => console.log(value)
    }
  }
})
```
