# Update Value On Close

```html
<n-space vertical>
  <n-date-picker
    type="datetime"
    :default-value="Date.now()"
    :update-value-on-close="updateValueOnClose"
  />
  <n-date-picker
    :default-value="[Date.now(), Date.now()]"
    :update-value-on-close="updateValueOnClose"
    type="daterange"
  />
  <n-date-picker
    :default-value="[Date.now(), Date.now()]"
    :update-value-on-close="updateValueOnClose"
    type="datetimerange"
  />
  <n-switch v-model:value="updateValueOnClose" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      updateValueOnClose: ref(true)
    }
  }
})
```
