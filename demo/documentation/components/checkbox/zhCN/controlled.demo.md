# 受控状态
```html
<n-checkbox :checked="value">复选框</n-checkbox>
<n-switch v-model:value="value"/>
```
```js
export default {
  data () {
    return {
      value: false
    }
  }
}
```
```css
.n-checkbox {
  margin: 0 12px 8px 0;
}
```