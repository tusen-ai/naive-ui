# Image

Preview it.

## Demos

```demo
basic.vue
group.vue
error.vue
custom-error.vue
preview-disabled.vue
custom-toolbar.vue
custom.vue
tooltip.vue
lazy.vue
previewed-img-props.vue
manually-open-preview.vue
component-preview.vue
component-preview-group.vue
```

## API

### Image Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| alt | `string` | `undefined` | Image alt information. |  |
| fallback-src | `string` | `undefined` | URL to show when the image fails to load. |  |
| height | `string \| number` | `undefined` | Image height. |  |
| img-props | `ImgHTMLAttributes` | `undefined` | The props of the img element inside the component. |  |
| lazy | `boolean` | `false` | Load image after it enters viewport. When used alone, it will be assigned the property value of [HTMLImageElement.loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading). Alternatively, it can be used in conjunction with the `intersection-observer-options` configuration to achieve lazy loading. | 2.30.5 |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | Intersection observer's config to be applied when `lazy=true`. | 2.30.5 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `fill` | Object-fit type of the image in the container. |  |
| preview-src | `string` | `undefined` | Source of preview image. |  |
| preview-disabled | `boolean` | `false` | Whether clicking image preview is disabled. |  |
| previewed-img-props | `HTMLAttributes` | `undefined` | DOM attributes of img element in preview mode. | 2.34.0 |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | Toolbar rendering function. | `2.38.2` |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |  |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. | 2.24.0 |
| src | `string` | `undefined` | Image source. |  |
| width | `string \| number` | `undefined` | Image width. |  |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the image fails to load. |  |
| on-load | `(e: Event) => void` | `undefined` | Callback executed after the image is loaded. |  |

### ImageGroup Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| current | `number` | `undefined` | The subscript of the currently displayed image. | 2.43.0 |
| default-current | `number` | `0` | The subscript of the default displayed image. | 2.43.0 |
| default-show | `boolean` | `false` | Whether to show the preview big image by default. | 2.43.0 |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | Toolbar rendering function. | `2.38.2` |
| show | `boolean` | `undefined` | Whether to the show preview big image. | 2.43.0 |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |  |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. | 2.24.0 |
| src-list | `string[]` | `undefined` | Picture src list. | 2.43.0 |
| on-preview-next | `() => void` | `undefined` | Click the callback on the next slide. |
| on-preview-prev | `() => void` | `undefined` | Click the callback from the previous slide. |  |
| on-update:current | `(value: number) => void` | `undefined` | Callback on currently displayed image changes. | 2.43.0 |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. | 2.43.0 |

### ImagePreview Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-show | `boolean` | `false` | Whether to show the preview big image by default. | 2.43.0 |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | Toolbar rendering function. | 2.43.0 |
| show | `boolean` | `undefined` | Whether to the show preview big image. | 2.43.0 |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. | 2.43.0 |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. | 2.43.0 |
| src | `string` | `undefined` | Image source. | 2.43.0 |
| on-close | `() => void` | `undefined` | Callback when close the preview of the image. | 2.43.0 |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. | 2.43.0 |

### Image Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| error | `()` | The content when the image fails to load. | 2.40.2 |
| placeholder | `()` | Placeholder shown when image is not loaded. | 2.30.5 |

### ImageGroup Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The default content of the image group. |

### Image Methods

| Name        | Type         | Description                          | Version |
| ----------- | ------------ | ------------------------------------ | ------- |
| showPreview | `() => void` | Show preview interface of the image. | 2.43.0  |
