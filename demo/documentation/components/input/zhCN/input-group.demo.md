# 输入组
```html
<n-input-group>
  <n-input :style="{ width: '33%' }" v-model="value1" />
  <n-input-number :style="{ width: '33%' }" v-model="value2" />
  <n-input :style="{ width: '33%' }" v-model="value3" />
</n-input-group>
<n-input-group>
  <n-input-group-label>https://www.</n-input-group-label>
  <n-input :style="{ width: '33%' }" v-model="value4" />
  <n-input-group-label>.com</n-input-group-label>
</n-input-group>
<n-input-group>
  <n-select :style="{ width: '33%' }" v-model="value5" :options="selectOptions" />
  <n-cascader :style="{ width: '33%' }" v-model="value6" :options="cascaderOptions" />
  <n-select :style="{ width: '33%' }" multiple v-model="value7" :options="selectOptions" />
</n-input-group>
<n-input-group>
  <n-button type="primary">搜索</n-button>
  <n-input :style="{ width: '50%' }" v-model="value8" />
  <n-button type="primary" ghost>搜索</n-button>
</n-input-group>
<n-input-group>
  <n-date-picker v-model="value9"/>
  <n-time-picker v-model="value10"/>
</n-input-group>
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
```css
.n-input-group {
  margin-bottom: 12px;
}
```

