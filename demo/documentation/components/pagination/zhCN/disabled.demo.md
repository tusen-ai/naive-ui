# 禁用
```html
<n-pagination
  v-model="page"
  :page-count="100"
  show-size-picker
  :page-size="pageSize"
  :page-sizes="[10, 20, 30, 40]"
  show-quick-jumper
  :disabled="disabled"
  @page-size-change="handlePageSizeChange"
  :style="{ marginBottom: '12px' }"
/>
<n-switch v-model="disabled" />
```

```js
export default {
  data () {
    return {
      page: 2,
      pageSize: 20,
      disabled: true
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
```css
.n-switch {
  margin-left: 12px;
}
```