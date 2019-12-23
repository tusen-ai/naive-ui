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
      <md-hand />
    </n-icon>
  </template>
  <template v-slot:activator>
    <n-button>Quit</n-button>
  </template>
  Are you sure to quit this game?
</n-popconfirm>
```
```js
import mdHand from 'naive-ui/lib/icons/md-hand'

export default {
  components: {
    mdHand
  }
}
```