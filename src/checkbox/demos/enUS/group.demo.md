# Checkbox Group

```html
<n-space item-style="display: flex;" vertical>
  <n-checkbox-group v-model:value="cities">
    <n-space item-style="display: flex;">
      <n-checkbox value="Beijing" label="Beijing" />
      <n-checkbox value="Shanghai" label="Shanghai" />
      <n-checkbox value="Guangzhou" label="Guangzhou" />
      <n-checkbox value="Shenzen" label="Shenzhen" />
    </n-space>
  </n-checkbox-group>
  <n-checkbox-group
    :options="options"
    :value="optionsCities"
    @update:value="handleUpdateOptionsValue"
  >
  </n-checkbox-group>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const citiesRef = ref(null)
    const optionsCitiesRef = ref(null)
    const options = [
      { value: 'Apple', indeterminate: true, label: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]
    return {
      options,
      cities: citiesRef,
      optionsCities: optionsCitiesRef,
      handleUpdateOptionsValue (value) {
        optionsCitiesRef.value = value
      }
    }
  }
})
```
