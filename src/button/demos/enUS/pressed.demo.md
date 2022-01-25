# Pressed

Buttons can have pressed states.

```html
<n-space>
  <n-button :pressed="pressed" @click="handleClick">
    <template #icon>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    Click Me
  </n-button>
  <n-button :pressed="pressed" icon-placement="left" @click="handleClick">
    Click Me
  </n-button>
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    const pressedRef = ref(false)
    return {
      handleClick () {
        pressedRef.value = true
        setTimeout(() => {
          pressedRef.value = false
        }, 2000)
      },
      pressed: pressedRef
    }
  }
})
```
