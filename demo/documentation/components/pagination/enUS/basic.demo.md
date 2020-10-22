# Basic
```html
<n-pagination
  v-model:page="page"
  :page-count="100"
/>
```

```js
export default {
  data () {
    return {
      page: 2
    }
  }
}
```