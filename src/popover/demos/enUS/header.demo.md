# With header

Use `header` slot to customize header.

```html
<n-popover trigger="click">
  <template #trigger>
    <n-button>There's a divider</n-button>
  </template>
  <template #header>
    <n-text strong depth="1">Divider is on the bottom.</n-text>
  </template>
  Divider is on the top.
</n-popover>
```
