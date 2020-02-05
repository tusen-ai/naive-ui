# 事件
```html
<n-checkbox v-model="value" @change="handleChange">事件</n-checkbox>
<n-checkbox-group v-model="cities"  @change="handleChange">
  <n-checkbox value="Beijing">北京</n-checkbox>
  <n-checkbox value="Shanghai">上海</n-checkbox>
  <n-checkbox value="Guangzhou">广州</n-checkbox>
  <n-checkbox value="Shenzen">深圳</n-checkbox>
</n-checkbox-group>
```
```js
export default {
  data () {
    return {
      value: false,
      cities: null
    }
  },
  methods: {
    handleChange (v) {
      this.$NMessage.info(JSON.stringify(v))
    }
  }
}
```
```css
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```