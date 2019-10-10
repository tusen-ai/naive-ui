# Size
```html
<n-input v-model="value" type="input" size="small" placeholder="Small Input"/>
<n-input v-model="value" type="input" placeholder="Medium Input"/>
<n-input v-model="value" type="input" size="large"  placeholder="Large Input"/>
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