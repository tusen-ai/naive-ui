# Image

Preview it.

## Demos

```demo
basic
group
loading
error
```

## API

### Image Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| alt | `string` | `undefined` | Image alt information. |
| height | `string \| number` | `undefined` | Image height. |
| img-props | `object` | `undefined` | The props of the img element inside the component. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `fill` | Object-fit type of the image in the container. |
| preview-src | `string` | `undefined` | Source of preview image. |
| can-preview | `boolean` | `true` | Whether clicking image preview is allowed. |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |
| src | `string` | `undefined` | Image source. |
| width | `string \| number` | `undefined` | Image width. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the image fails to load. |
| on-load | `(e: Event) => void` | `undefined` | Callback executed after the image is loaded. |

### Image Slots

| Name     | Type | Description                                          |
| -------- | ---- | ---------------------------------------------------- |
| loading  | `()` | Excessive animation during image loading.            |
| errorbox | `()` | A placeholder in the event of an image load failure. |

### ImageGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |

### ImageGroup Slots

| Name    | Type | Description                             |
| ------- | ---- | --------------------------------------- |
| default | `()` | The default content of the image group. |
