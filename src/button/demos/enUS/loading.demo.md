# Loading

Button has loading status.

```html
<n-space>
  <n-button :loading="loading" @click="loading = !loading">
    <template #icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    Click Me
  </n-button>
  <n-button
    :loading="loading"
    icon-placement="left"
    @click="loading = !loading"
  >
    Click Me
  </n-button>
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default {
  components: {
    CashIcon
  },
  data () {
    return {
      loading: false
    }
  }
}
```
