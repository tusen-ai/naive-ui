# Date Range

```html
<n-date-picker v-model:value="range" type="daterange" clearable />
<pre>{{ JSON.stringify(range) }}</pre>
```

```js
export default {
  data () {
    return {
      range: [1183135260000, Date.now()]
    }
  }
}
```
