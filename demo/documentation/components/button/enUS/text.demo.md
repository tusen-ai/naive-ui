# Text Button

Somebody also calls it `link` button.

```html
<n-button text size="large">
  <template v-slot:icon>
    <n-icon>
      <train-icon />
    </n-icon>
  </template>
  The Engine is Still Spiting Smoke
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
