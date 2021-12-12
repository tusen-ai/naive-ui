# Body style

Set style attribute to style the popover.

```html
<n-space>
  <n-popover :style="{ width: '500px' }" trigger="hover">
    <template #trigger>
      <n-button>Width 500px</n-button>
    </template>
    Looks like a bar
  </n-popover>
  <n-popover :style="{ maxWidth: '100px' }" trigger="hover">
    <template #trigger>
      <n-button style="margin:0;">Max width 100px</n-button>
    </template>
    Who kicks a hole in the sky so the heaven cry over me.
  </n-popover>
</n-space>
```
