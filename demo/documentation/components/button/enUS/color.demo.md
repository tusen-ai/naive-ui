# Custom Color

The two colors look like toadstool.

```html
<n-space align="center">
  <n-button color="#8a2be2">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #8a2be2
  </n-button>
  <n-button color="#ff69b4">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #ff69b4
  </n-button>
  <n-button ghost color="#8a2be2">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #8a2be2
  </n-button>
  <n-button ghost color="#ff69b4">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #ff69b4
  </n-button>
  <n-button text color="#8a2be2">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #8a2be2
  </n-button>
  <n-button text color="#ff69b4">
    <template v-slot:icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    #ff69b4
  </n-button>
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    CashIcon
  }
}
```
