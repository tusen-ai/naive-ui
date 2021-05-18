# Prefix & Suffix

You may want to add something before and after.

```html
<n-pagination item-count="101">
  <template #prefix="{ startIndex }"> From Item No.{{ startIndex }} </template>
  <template #suffix="{ endIndex }"> To Item No.{{ endIndex }} </template>
</n-pagination>
```
