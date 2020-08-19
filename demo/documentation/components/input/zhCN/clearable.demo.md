# 可清除
让输入值可以清除（当有值的时候）。
```html
<n-input
  v-model="value"
  type="input"
  placeholder="可以清除"
  clearable
/>
<n-input
  v-model="value"
  type="password"
  placeholder="可以清除"
  clearable
/>
<n-input
  v-model="value"
  type="textarea"
  placeholder="可以清除"
  round
  clearable
/>
<n-button size="small" @click="value = '可以清除'">填充内容</n-button>
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