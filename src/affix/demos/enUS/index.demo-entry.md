# Affix

Affix can make content stick to fixed places when scrolling. It's similar to `position: sticky` but can do more things.

## Demos

```demo
basic.vue
position.vue
```

## API

### Affix Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number` | `undefined` | The css bottom property after trigger bottom affix. (if not set, use `trigger-bottom` prop) |
| listen-to | `string \| HTMLElement \| Document \| Window \| (() => HTMLElement)` | `document` | The scrolling element to listen scrolling. |
| trigger-bottom | `number` | `undefined` | The distance px to bottom of target to trigger bottom affix. (if not set, use `bottom` prop) |
| trigger-top | `number` | `undefined` | The distance px to top of target to trigger top affix. (if not set, use `top` prop) |
| position | `'fixed' \| 'absolute'` | `'fixed'` | CSS position of the affix. |
| top | `number` | `undefined` | The css top property after trigger top affix. (if not set, use `trigger-top` prop) |
