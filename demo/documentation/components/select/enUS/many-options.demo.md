# Lots of Options
1000 times of the ultimate answer.
```html
<n-select
  v-model:value="value"
  :options="options"
/>
<n-select
  multiple
  v-model:value="values"
  :options="options"
/>
```
```js
export default {
  data () {
    return {
      value: null,
      values: null,
      options: Array.apply(null, { length: 42000 }).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
}
```
```css
.n-select {
  width: 180px;
  margin: 0 12px 8px 0;
}
```