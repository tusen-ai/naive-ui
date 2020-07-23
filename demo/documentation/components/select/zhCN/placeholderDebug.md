# Placehoder Debug
```html
<n-select
  v-model="value2"
  placeholder=""
  :options="options"
  style="width:200px;"
/>

<n-select
  v-model="value3"
  multiple
  placeholder=""
  :options="options"
  style="width:200px;"
/>
```
```js
export default {
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1',
        }
      ],
      value1: null,
      value2: null,
      value3: null
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