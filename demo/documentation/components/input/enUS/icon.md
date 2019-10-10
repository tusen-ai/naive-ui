# Icon
Use icon in input.
```html
<n-input v-model="value" icon="md-search" placeholder="Search"/>
<n-input v-model="value" icon="md-search" round placeholder="Search"/>
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