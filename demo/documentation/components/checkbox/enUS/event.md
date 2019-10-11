# Event
```html
<n-checkbox v-model="value" @change="handleChange">Event</n-checkbox>
<n-checkbox-group v-model="cities"  @change="handleChange">
  <n-checkbox value="Beijing">Beijing</n-checkbox>
  <n-checkbox value="Shanghai">Shanghai</n-checkbox>
  <n-checkbox value="Guangzhou">Guangzhou</n-checkbox>
  <n-checkbox value="Shenzen">Shenzhen</n-checkbox>
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