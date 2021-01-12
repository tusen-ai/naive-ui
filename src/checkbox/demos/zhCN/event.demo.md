# 事件

```html
<n-space item-style="display: flex;" vertical>
  <n-checkbox
    :checked="checked"
    @update:checked="handleCheckedChange"
    label="事件"
  />
  <n-checkbox-group :value="cities" @update:value="handleUpdateValue">
    <n-space item-style="display: flex;" align="center">
      <n-checkbox value="Beijing" label="北京" />
      <n-checkbox value="Shanghai" label="上海" />
      <n-checkbox value="Guangzhou" label="广州" />
      <n-checkbox value="Shenzen" label="深圳" />
    </n-space>
  </n-checkbox-group>
</n-space>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      checked: false,
      cities: null
    }
  },
  methods: {
    handleCheckedChange (checked) {
      this.checked = checked
      this.message.info(JSON.stringify(checked))
    },
    handleUpdateValue (value) {
      this.cities = value
      this.message.info(JSON.stringify(value))
    }
  }
}
```
