# Round corner
Input can have round corner.
```html
<n-input v-model:value="value" size="small" round placeholder="Small"/>
<n-input v-model:value="value" round placeholder="Medium"/>
<n-input v-model:value="value" size="large" round placeholder="Large"/>
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