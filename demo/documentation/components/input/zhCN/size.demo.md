# 尺寸
```html
<n-input v-model:value="value" type="input" size="small" placeholder="小"/>
<n-input v-model:value="value" type="input" placeholder="中"/>
<n-input v-model:value="value" type="input" size="large"  placeholder="大"/>
```
```js
export default {
  data() {
    return {
      value: null
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```