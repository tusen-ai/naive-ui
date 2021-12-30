# Popover

Pop some hidden message around content. There isn't much builtin styles in popover. It's more up to you to fill the content.

If you just want to display some basic text message, see [Tooltip](tooltip) instead.

## Demos

```demo
basic
flip
trigger
delay
no-arrow
event
placement
raw-content
style
trigger-width
manual-position
header
```

## API

### Popover Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use animation when popping up. |
| arrow-style | `Object` | `undefined` | Arrow style for popover. |
| delay | `number` | `100` | Popover showing delay when trigger is `hover` |
| disabled | `boolean` | `false` | Whether the popover can't be activated. |
| display-directive | `'if' \| 'show'` | `'if'` | The conditionally render directive to show popover content. `if` means using `v-if` to render content, `show` means using `v-show` to render content. |
| duration | `number` | `100` | Popover vanish delay when trigger is `hover` |
| flip | `boolean` | `true` | Whether to flip the popover when there is no space for current placement. |
| overlap | `boolean` | `false` | Overlap trigger element. |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | Popover placement. |
| raw | `boolean` | `false` | Whether to use no default styles. |
| shift | `boolean` | `false` | Whether to shift the popover when there is no space for current placement. |
| show-arrow | `boolean` | `true` | Whether to show arrow if set. |
| show | `boolean` | `undefined` | Whether to show popover. |
| title | `string` | `undefined` | Popover title. |
| to | `string \| HTMLElement \| false` | `'body'` | Container node of the popover content. `false` will keep it at trigger container. |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | The popover trigger type. |
| width | `number \| 'trigger'` | `undefined` | `'trigger'` means popover's width will follow its trigger's width. |
| x | `number` | `undefined` | The CSS `left` pixel value when popover manually positioned (x, y need to be set together). |
| y | `number` | `undefined` | The CSS `top` pixel value when popover manually positioned (x, y need to be set together). |
| z-index | `number` | `undefined` | The z-index of the popover. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when clickoutside. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. |

### Popover Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| trigger | `()`       | The element or component that triggers popover. |
| header  | `()`       | The header content of the popover.              |
| default | `()`       | The content inside popover.                     |

### Popover Methods

| Name         | Parameters        | Description                           |
| ------------ | ----------------- | ------------------------------------- |
| setShow      | `(show: boolean)` | Set show status in uncontrolled mode. |
| syncPosition | `()`              | Sync popover position.                |
