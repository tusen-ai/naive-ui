# 选项组

```html
<n-space item-style="display: flex;" vertical>
  <n-checkbox-group v-model:value="cities">
    <n-space item-style="display: flex;">
      <n-checkbox value="Beijing" label="北京" />
      <n-checkbox value="Shanghai" label="上海" />
      <n-checkbox value="Guangzhou" label="广州" />
      <n-checkbox value="Shenzen" label="深圳" />
    </n-space>
  </n-checkbox-group>
  <n-checkbox-group :options="options" v-model:value="optionsCities">
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
      optionsCities: optionsCitiesRef
    }
  }
})
```
