# Event

```html
<n-space item-style="display: flex;" vertical>
  <n-checkbox
    v-model:checked="checked"
    @update:checked="handleCheckedChange"
    label="Event"
  />
  <n-checkbox-group v-model:value="cities" @update:value="handleUpdateValue">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox value="Beijing" label="Beijing" />
      <n-checkbox value="Shanghai" label="Shanghai" />
      <n-checkbox value="Guangzhou" label="Guangzhou" />
      <n-checkbox value="Shenzen" label="Shenzhen" />
    </n-space>
  </n-checkbox-group>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const checkedRef = ref(false)
    const citiesRef = ref(null)
    const message = useMessage()
    return {
      checked: checkedRef,
      cities: citiesRef,
      handleCheckedChange (checked) {
        checkedRef.value = checked
        message.info(JSON.stringify(checked))
      },
      handleUpdateValue (value) {
        citiesRef.value = value
        message.info(JSON.stringify(value))
      }
    }
  }
})
```
