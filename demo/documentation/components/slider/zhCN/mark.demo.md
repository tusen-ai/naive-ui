# 标记
```html
<n-slider
  v-model:value="value"
  range
  :marks="marks"
  :step="10"
/>
<n-input-number
  size="small"
  v-model:value="value[0]"
/>
<n-input-number
  size="small"
  v-model:value="value[1]"
/>
```
```js
export default {
  data () {
    return {
      value: [50, 70],
      marks: {
        34: '太棒了',
        75: '不错'
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