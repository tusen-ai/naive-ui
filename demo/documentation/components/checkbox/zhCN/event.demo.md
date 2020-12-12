# 事件

```html
<n-checkbox
  :checked="checked"
  @update:checked="handleCheckedChange"
  label="事件"
/>
<n-checkbox-group :value="cities" @update:value="handleUpdateValue">
  <n-checkbox value="Beijing" label="北京" />
  <n-checkbox value="Shanghai" label="上海" />
  <n-checkbox value="Guangzhou" label="广州" />
  <n-checkbox value="Shenzen" label="深圳" />
</n-checkbox-group>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      checked: false,
      cities: null
    }
  },
  methods: {
    handleCheckedChange(checked) {
      this.checked = checked
      this.message.info(JSON.stringify(checked))
    },
    handleUpdateValue(value) {
      this.cities = value
      this.message.info(JSON.stringify(value))
    }
  }
}
```

```css
.n-checkbox,
.n-button {
  margin: 0 12px 8px 0;
}
```
