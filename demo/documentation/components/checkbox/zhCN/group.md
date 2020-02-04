# 选项组
```html
<n-checkbox-group v-model="cities">
  <n-checkbox value="Beijing">北京</n-checkbox>
  <n-checkbox value="Shanghai">上海</n-checkbox>
  <n-checkbox value="Guangzhou">广州</n-checkbox>
  <n-checkbox value="Shenzen">深圳</n-checkbox>
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