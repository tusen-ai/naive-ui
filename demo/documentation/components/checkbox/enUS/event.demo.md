# Event
```html
<n-checkbox v-model="value" @change="handleChange" label="Event" />
<n-checkbox-group v-model="cities"  @change="handleChange">
  <n-checkbox value="Beijing" label="Beijing" />
  <n-checkbox value="Shanghai" label="Shanghai" />
  <n-checkbox value="Guangzhou" label="Guangzhou" />
  <n-checkbox value="Shenzen" label="Shenzhen" />
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