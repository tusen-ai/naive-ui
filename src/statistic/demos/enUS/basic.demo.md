# Basic

```html
<n-row>
  <n-col :span="12">
    <n-statistic label="Statistic" :value="99">
      <template #prefix>
        <n-icon>
          <md-save />
        </n-icon>
      </template>
      <template #suffix> / 100 </template>
    </n-statistic>
  </n-col>
  <n-col :span="12">
    <n-statistic label="Active Users" value="1,234,123"> </n-statistic>
  </n-col>
</n-row>
```

```js
import { MdSave } from '@vicons/ionicons-v4'

export default {
  components: {
    MdSave
  }
}
```
