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
