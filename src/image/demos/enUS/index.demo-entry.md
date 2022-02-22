# Image

Preview it.

## Demos

```demo
basic.vue
group.vue
error.vue
preview-disabled.vue
custom.vue
tooltip.vue
```

## API

### Image Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| alt | `string` | `undefined` | Image alt information. |  |
| fallback-src | `string` | `undefined` | URL to show when the image fails to load. |  |
| height | `string \| number` | `undefined` | Image height. |  |
| img-props | `object` | `undefined` | The props of the img element inside the component. |  |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `fill` | Object-fit type of the image in the container. |  |
| preview-src | `string` | `undefined` | Source of preview image. |  |
| preview-disabled | `boolean` | `false` | Whether clicking image preview is disabled. |  |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |  |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. | 2.24.0 |
| src | `string` | `undefined` | Image source. |  |
| width | `string \| number` | `undefined` | Image width. |  |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the image fails to load. |  |
| on-load | `(e: Event) => void` | `undefined` | Callback executed after the image is loaded. |  |

### ImageGroup Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |  |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. | 2.24.0 |

### ImageGroup Slots

| Name    | Type | Description                             |
| ------- | ---- | --------------------------------------- |
| default | `()` | The default content of the image group. |
