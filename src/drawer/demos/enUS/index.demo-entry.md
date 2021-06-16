# Drawer

I think it is similar with modal, with a bit difference on placement.

## Demos

```demo
basic
multiple
target
closable
```

## Props

### Drawer Props

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| content-style | `string \| Object` | `undefined` | Style of drawer's scrollable content node. |
| height | `number \| string` | `251` | Works when placement is `top` and `bottom`. |
| native-scrollbar | `boolean` | `true` |  |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |  |
| show | `boolean` | `false` |  |
| style | `string \| Object` | `undefined` | Style of the drawer. |
| to | `string \| HTMLElement` | `'body'` | Container node of the drawer. |
| width | `number \| string` | `251` |  |
| on-update:show | `(show: boolean) => void` | `undefined` |  |

### DrawerContent Props

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| body-style | `string \| Object` | `undefined` |  |
| body-content-style | `string \| Object` | `undefined` | Style of body's scrollable content node. |
| closable | `boolean` | `false` | Whether the drawer content is closable. |
| footer-style | `string \| Object` | `undefined` |  |
| header-style | `string \| Object` | `undefined` |  |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on body part. |
| title | `string` | `undefined` |  |

## Slots

### Drawer Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### DrawerContent Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
| header  | `()`       |             |
| footer  | `()`       |             |
