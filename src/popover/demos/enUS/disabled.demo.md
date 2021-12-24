# Trigger when the button is disabled

Button disabled cannot block other native events

```html
<n-popover trigger="hover">
  <template #trigger>
    <n-button disabled> Hover </n-button>
  </template>
  <span>Button disabled will not affect hover</span>
</n-popover>
```
