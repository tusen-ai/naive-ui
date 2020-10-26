# Icon
Use icon in button.
```html
<n-space>
  <n-button>
    <template v-slot:icon>
      <cash-icon />
    </template>
    +100$
  </n-button>
  <n-button icon-placement="right">
    <template v-slot:icon>
      <cash-icon />
    </template>
    +100$
  </n-button>
</n-space>
```
```js
import CashIcon from 'naive-ui/lib/icons/cash-outline.vue'

export default {
  components: {
    CashIcon
  }
}
```
