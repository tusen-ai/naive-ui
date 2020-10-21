# Event
```html
<n-checkbox v-model:value="checked" @update:checked="handleCheckedChange" label="Event" />
<n-checkbox-group v-model:value="cities" @update:value="handleUpdateValue">
  <n-checkbox value="Beijing" label="Beijing" />
  <n-checkbox value="Shanghai" label="Shanghai" />
  <n-checkbox value="Guangzhou" label="Guangzhou" />
  <n-checkbox value="Shenzen" label="Shenzhen" />
</n-checkbox-group>
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
```css
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```