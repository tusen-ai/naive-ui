# Back Top

<!--single-column-->

It helps you back to where you were. However, time never goes back.

## Demos

Scroll down to see demos work.

```demo
basic.vue
visibility-height.vue
change-position.vue
target-container-selector.vue
```

## API

### BackTop Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number \| string` | `40` | The height of BackTop from the bottom of the page |
| listen-to | `string \| HTMLElement` | `undefined` | The element to be listened to scroll event. If it is `undefined` back top will listen to the nearest scrollable parent. |
| right | `number \| string` | `40` | The width of BackTop from the right side of the page |
| show | `boolean` | `undefined` | Whether to show BackTop |
| to | `string \| HTMLElement` | `'body'` | Container node to show BackTop |
| visibility-height | `number` | `180` | BackTop's trigger scroll top. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback is triggered when back-top display changes. |
