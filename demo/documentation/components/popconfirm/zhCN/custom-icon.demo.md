# 自定义图标

```html
<n-popconfirm positive-text="ok" negative-text="not ok">
  <template #icon>
    <n-icon color="red">
      <hand-icon />
    </n-icon>
  </template>
  <template #trigger>
    <n-button>退出游戏</n-button>
  </template>
  不充钱怎么变强？
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
