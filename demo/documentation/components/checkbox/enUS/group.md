# Checkbox Group
```html
<n-checkbox-group v-model="cities">
  <n-checkbox value="Beijing">Beijing</n-checkbox>
  <n-checkbox value="Shanghai">Shanghai</n-checkbox>
  <n-checkbox value="Guangzhou">Guangzhou</n-checkbox>
  <n-checkbox value="Shenzen">Shenzhen</n-checkbox>
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