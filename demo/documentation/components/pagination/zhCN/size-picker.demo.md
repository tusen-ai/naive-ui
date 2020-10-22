# 每页条数
```html
<n-pagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :page-count="100"
  show-size-picker
  :page-sizes="[10, 20, 30, 40]"
/>
```

```js
export default {
  data () {
    return {
      page: 2,
      pageSize: 20
    }
  }
}
```