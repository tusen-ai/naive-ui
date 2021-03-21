# Popover

Pop some hidden message around content. There isn't much builtin styles in popover. It's more up to you to fill the content.

If you just want to display some basic text message, see [Tooltip](n-tooltip) instead.

## Demos

```demo
basic
trigger
delay
no-arrow
event
placement
raw-content
style
trigger-width
manual-position
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` |  |
| arrow-style | `Object` | `undefined` |  |
| delay | `number` | `100` | Popover showing delay when trigger is `hover` |
| disabled | `boolean` | `false` | Whether the popover can't be activated. |
| display-directive | `'if' \| 'show'` | `'if'` | The conditionally render directive to show popover content. `if` means using `v-if` to render content, `show` means using `v-show` to render content. |
| duration | `number` | `100` | Popover vanish delay when trigger is `hover` |
| filp | `boolean` | `true` | Whether to filp the popover when there is no space for current placement. |
| overlap | `boolean` | `false` |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'bottom'` |  |
| raw | `boolean` | `false` | Whether to use no default styles. |
| show-arrow | `boolean` | `true` |  |
| show | `boolean` | `undefined` | Whether to show popover if set. |
| trigger | `'hover' \| 'click'` | `'hover'` |  |
| width | `number \| 'trigger'` | `undefined` | `'trigger'` means popover's witdh will follow its trigger's width. |
| x | `number` | `undefined` | The CSS `left` pixel value when popover manually positioned. |
| y | `number` | `undefined` | The CSS `top` pixel value when popover manually positioned. |
| on-update:show | `(value: boolean) => void` |  |  |

## Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| trigger | `()`       | The element or component that triggers popover. |
| default | `()`       | The content inside popover.                     |
