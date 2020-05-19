# Checkbox Group
```html
<n-checkbox-group v-model="cities">
  <n-checkbox value="Beijing" label="Beijing" />
  <n-checkbox value="Shanghai" label="Shanghai" />
  <n-checkbox value="Guangzhou" label="Guangzhou" />
  <n-checkbox value="Shenzen" label="Shenzhen" />
</n-checkbox-group>
```
```js
export default {
  data() {
    return {
      cities: null
    }
  }
}
```
```css
.n-checkbox {
  margin-right: 12px;
}
```