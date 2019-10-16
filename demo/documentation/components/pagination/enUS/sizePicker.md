# Size Picker
```html
<n-pagination
  v-model="page"
  :page-count="100"
  show-size-picker
  :page-size="pageSize"
  :page-sizes="[10, 20, 30, 40]"
  @page-size-change="handlePageSizeChange"
/>
```

```js
export default {
  data () {
    return {
      page: 2,
      pageSize: 20
    }
  },
  methods: {
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.$NMessage.info(`Page size is set to ${pageSize}`)
    }
  }
}
```