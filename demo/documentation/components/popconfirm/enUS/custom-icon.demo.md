# Custom Icon
```html
<n-popconfirm
  positive-text="ok"
  negative-text="not ok"
>
  <template v-slot:icon>
    <n-icon
      color="red"
    >
      <hand-icon />
    </n-icon>
  </template>
  <template v-slot:trigger>
    <n-button>Quit Game</n-button>
  </template>
  How can you be strong without purchasing?
</n-popconfirm>
```
```js
import { MdHand as HandIcon } from '@vicons/ionicons-v4'

export default {
  components: {
    HandIcon
  }
}
```