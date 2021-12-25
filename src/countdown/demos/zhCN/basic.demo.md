# 基础用法

```html
<n-countdown
  title="Countdown"
  :value="Date.now() + 2 * 3600 * 1000"
  :now="Date.now()"
  v-model:start="start"
>
  <template #prefix>
    <n-icon>
      <md-clock />
    </n-icon>
  </template>
</n-countdown>
<n-button @click="start=!start">开始倒计时</n-button>
```

```js
import { defineComponent, ref } from 'vue'
import { MdClock } from '@vicons/ionicons4'
export default defineComponent({
  components: {
    MdClock
  },
  setup () {
    return {
      start: ref(false)
    }
  }
})
```
