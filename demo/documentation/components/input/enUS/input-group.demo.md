# Input Group
```html
<n-space vertical align="stretch">
  <n-input-group>
    <n-input :style="{ width: '33%' }" v-model:value="value1" />
    <n-input-number :style="{ width: '33%' }" v-model:value="value2" />
    <n-input :style="{ width: '33%' }" v-model:value="value3" />
  </n-input-group>
  <n-input-group>
    <n-input-group-label>https://www.</n-input-group-label>
    <n-input :style="{ width: '33%' }" v-model:value="value4" />
    <n-input-group-label>.com</n-input-group-label>
  </n-input-group>
  <n-input-group>
    <n-select :style="{ width: '33%' }" v-model:value="value5" :options="selectOptions" />
    <n-cascader :style="{ width: '33%' }" v-model:value="value6" :options="cascaderOptions" />
    <n-select :style="{ width: '33%' }" multiple v-model:value="value7" :options="selectOptions" />
  </n-input-group>
  <n-input-group>
    <n-button type="primary">Search</n-button>
    <n-input :style="{ width: '50%' }" v-model:value="value8" />
    <n-button type="primary" ghost>Search</n-button>
  </n-input-group>
  <n-input-group>
    <n-date-picker v-model:value="value9"/>
    <n-time-picker v-model:value="value10"/>
  </n-input-group>
</n-space>
```
```js
export default {
  data () {
    return {
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: 'option',
      value6: null,
      value7: ['option'],
      value8: null,
      value9: null,
      value10: null,
      selectOptions: [{
        label: 'option',
        value: 'option'
      }],
      cascaderOptions: [
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
      ]
    }
  }
}
```

