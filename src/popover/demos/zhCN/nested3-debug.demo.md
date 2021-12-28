# Nested Debug 3

```html
<n-tooltip placement="bottom" trigger="click" display-directive="show">
  <template #trigger>
    <n-button>Test</n-button>
  </template>
  <n-popover trigger="click">
    <template #trigger> Test </template>
    Popover
  </n-popover>
</n-tooltip>
```
