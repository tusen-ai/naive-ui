# 自定义图标
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
    <n-button>退出游戏</n-button>
  </template>
  不充钱怎么变强？
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