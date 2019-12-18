# Mark
```html
<n-slider
  v-model="value"
  range
  :marks="marks"
  :step="10"
/>
<n-input-number
  size="small"
  v-model="value[0]"
/>
<n-input-number
  size="small"
  v-model="value[1]"
/>
```
```js
export default {
  data () {
    return {
      value: [50, 70],
      marks: {
        34: 'Amazing',
        75: 'Good'
      }
    }
  }
}
```
```css
.n-input-number {
  margin: 0 12px 8px 0;
}
```