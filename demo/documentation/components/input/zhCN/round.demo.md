# 圆角
文本输入可以是圆角的。
```html
<n-input v-model:value="value" size="small" round placeholder="小"/>
<n-input v-model:value="value" round placeholder="中"/>
<n-input v-model:value="value" size="large" round placeholder="大"/>
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