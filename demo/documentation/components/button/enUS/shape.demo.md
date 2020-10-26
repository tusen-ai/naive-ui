# Shape
Button has different shapes.
```html
<n-space>
  <n-button circle>
    <template v-slot:icon>
      <cash-icon />
    </template>
  </n-button>
  <n-button round>Round</n-button>
  <n-button>Rect</n-button>
</n-space>
```
```js
import CashIcon from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    CashIcon
  }
}
```
