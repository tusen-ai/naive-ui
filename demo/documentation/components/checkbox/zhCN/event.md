# 事件
```html
<n-checkbox v-model="value" @change="handleChange" label="事件" />
<n-checkbox-group v-model="cities"  @change="handleChange">
  <n-checkbox value="Beijing" label="北京" />
  <n-checkbox value="Shanghai" label="上海" />
  <n-checkbox value="Guangzhou" label="广州" />
  <n-checkbox value="Shenzen" label="深圳" />
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