# 基础用法
```html
<n-pagination
  v-model="page"
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