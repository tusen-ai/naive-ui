# 文本按钮
有些人也会叫他 `link` 按钮。
```html
<n-button
  text
  size="large"
>
  <template v-slot:icon>
    <n-icon>
      <train-icon />
    </n-icon>
  </template>
  那车头依然吐着烟
</n-button>
```
```js
import { TrainOutline as TrainIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    TrainIcon
  }
}
```
