# Disabled
```html
<n-space vertical>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
    show-quick-jumper
    :disabled="disabled"
  />
  <n-switch v-model:value="disabled" />
</n-space>
```

```js
export default {
  data () {
    return {
      page: 2,
      pageSize: 20,
      disabled: true
    }
  }
}
```
