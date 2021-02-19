# Text Button

Somebody also calls it `link` button.

```html
<n-button text>
  <template #icon>
    <n-icon>
      <train-icon />
    </n-icon>
  </template>
  The Engine is Still Spiting Smoke
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
