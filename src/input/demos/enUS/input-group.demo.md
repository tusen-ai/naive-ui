# Input Group

```html
<n-space vertical>
  <n-input-group>
    <n-input v-model:value="value1" :style="{ width: '33%' }" />
    <n-input-number v-model:value="value2" :style="{ width: '33%' }" />
    <n-input v-model:value="value3" :style="{ width: '33%' }" />
  </n-input-group>
  <n-input-group>
    <n-input-group-label>https://www.</n-input-group-label>
    <n-input v-model:value="value4" :style="{ width: '33%' }" />
    <n-input-group-label>.com</n-input-group-label>
  </n-input-group>
  <n-input-group>
    <n-select v-model:value="value5" :style="{ width: '33%' }" :options="selectOptions" />
    <n-cascader v-model:value="value6" :style="{ width: '33%' }" :options="cascaderOptions" />
    <n-select v-model:value="value7" :style="{ width: '33%' }" multiple :options="selectOptions" />
  </n-input-group>
  <n-input-group>
    <n-button type="primary">Search</n-button>
    <n-input v-model:value="value8" :style="{ width: '50%' }" />
    <n-button type="primary" ghost>Search</n-button>
  </n-input-group>
  <n-input-group>
    <n-date-picker v-model:value="value9" />
    <n-time-picker v-model:value="value10" />
  </n-input-group>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value1: ref(null),
      value2: ref(null),
      value3: ref(null),
      value4: ref(null),
      value5: ref('option'),
      value6: ref(null),
      value7: ref(['option']),
      value8: ref(null),
      value9: ref(null),
      value10: ref(null),
      selectOptions: ref([
        {
          label: 'option',
          value: 'option'
        }
      ]),
      cascaderOptions: ref([
        {
          label: 'option-1',
          value: 'option-1',
          children: [
            {
              label: 'option-1-1',
              value: 'option-1-1'
            }
          ]
        }
      ])
    }
  }
})
```
