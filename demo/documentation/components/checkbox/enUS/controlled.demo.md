# Controlled Checkbox
```html
<n-checkbox :checked="value">Checkbox</n-checkbox>
<n-switch v-model="value"/>
```
```js
export default {
  data() {
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