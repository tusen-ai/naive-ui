# 数值动画

```html
<n-statistic
  title="用户增长率"
  :value="50.52"
  :precision="2"
  :value-from="0"
  v-model:start="start"
  animation
>
  <template #suffix>%</template>
</n-statistic>
<n-button @click="start=!start">开启动画</n-button>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      start: ref(false)
    }
  }
})
```
