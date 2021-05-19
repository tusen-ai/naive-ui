# 文本按钮

长得就像文本。

```html
<n-button text>
  <template #icon>
    <n-icon>
      <train-icon />
    </n-icon>
  </template>
  那车头依然吐着烟
</n-button>
```

```js
import { TrainOutline as TrainIcon } from '@vicons/ionicons5'

export default {
  components: {
    TrainIcon
  }
}
```
