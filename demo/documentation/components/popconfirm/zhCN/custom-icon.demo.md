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
      <hand-icon />
    </n-icon>
  </template>
  <template v-slot:trigger>
    <n-button>退出游戏</n-button>
  </template>
  不充钱怎么变强？
</n-popconfirm>
```
```js
import HandIcon from 'naive-ui/lib/icons/md-hand'

export default {
  components: {
    HandIcon
  }
}
```