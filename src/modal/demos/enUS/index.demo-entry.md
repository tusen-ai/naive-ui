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
transform-origin
```

## API

### Modal Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| preset | `'dialog' \| 'card'` | `undefined` | The preset of `n-modal`. |
| show | `boolean` | `false` | Whether to show modal. |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | The transform origin of the modal's display animation. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback when modal's display status is changed. |
| on-after-enter | `() => void` | `undefined` | Callback after modal is opened. |
| on-after-leave | `() => void` | `undefined` | Callback after modal is closed. |

### Modal with Preset Card Props

See [Card props](card#Card-Props)

### Modal with Preset Dialog Props

See [Dialog props](dialog#Dialog-Props)

### Modal without Preset Slots

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | The content of the modal. |

### Modal with Preset Card Slots

See [Card slots](card#Card-Slots)

### Modal with Preset Dialog Slots

See [Dialog slots](dialog#Dialog-Slots)
