# Modal

It just pops and shows you something.

## Demos

```demo
basic
controlled
mask-closable
custom-position
preset-card
preset-confirm
preset-confirm-slot
```

## Props

### Modal

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| preset | `'card' \| 'confirm'` | `undefined` | The preset of `n-modal`. |
| show | `boolean` | `false` | Whether to show modal. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback when modal's display status is changed. |
| on-after-enter | `() => void` | `undefined` | Callback after modal is opened. |
| on-after-leave | `() => void` | `undefined` | Callback after modal is closed. |

### Modal with Preset Card

See [Card props](card#Props)

### Modal with Preset Dialog

See [Dialog props](dialog#Props)

## Slots

### Modal without Preset

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | The content of the modal. |

### Modal with Preset Card

See [Card slots](card#Slots)

### Modal with Preset Dialog

See [Dialog slots](dialog#Slots)
