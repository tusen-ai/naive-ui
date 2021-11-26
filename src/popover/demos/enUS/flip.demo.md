# Adjust the popover

Use `flip` to decide whether to adjust, use `flipLevel` to decide the level of adjustment.

```html
<n-popover
  trigger="click"
  placement="bottom-start"
  :flip="true"
  :flip-level="1"
>
  <template #trigger>
    <n-button> Offset </n-button>
  </template>
  <span
    >The default level 1 is to adjust within the existing position. If the
    existing position is not satisfied, then you can set the level to 2, which
    will be offset appropriately at the same latitude. Note: if the popover is
    large enough, any offset will be blocked!</span
  >
</n-popover>
```
