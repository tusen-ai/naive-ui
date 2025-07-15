# 图像 Image

预览一下。

## 演示

```demo
basic.vue
group.vue
error.vue
custom-error.vue
preview-disabled.vue
custom-toolbar.vue
custom.vue
tooltip.vue
full-debug.vue
lazy.vue
previewed-img-props.vue
manually-open-preview.vue
component-preview.vue
component-preview-group.vue
component-preview-group-debug.vue
```

## API

### Image Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| alt | `string` | `undefined` | 图片说明 |  |
| fallback-src | `string` | `undefined` | 图片加载失败时显示的地址 |  |
| height | `string \| number` | `undefined` | 图片高度 |  |
| img-props | `ImgHTMLAttributes` | `undefined` | 组件中 img 元素的属性 |  |
| lazy | `boolean` | `false` | 是否让图片进入视口再加载，单独使用将设置为[HTMLImageElement.loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading) 的属性值；也可配合 `intersection-observer-options` 配置实现懒加载 | 2.30.5 |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | `lazy=true` 时 intersection observer 观测的配置 | 2.30.5 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 图片在容器内的的适应类型 |  |
| preview-src | `string` | `undefined` | 预览图片的图片地址 |  |
| preview-disabled | `boolean` | `false` | 是否禁用单击图像预览 |  |
| previewed-img-props | `HTMLAttributes` | `undefined` | 预览图片时 img 元素的属性 | 2.34.0 |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | 工具栏的渲染函数 | `2.38.2` |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | `boolean` | `false` | 是否展示工具栏的提示 | 2.24.0 |
| src | `string` | `undefined` | 图片来源 |  |
| width | `string \| number` | `undefined` | 图片宽度 |  |
| on-error | `(e: Event) => void` | `undefined` | 图片加载失败执行的回调 |  |
| on-load | `(e: Event) => void` | `undefined` | 图片加载完成执行的回调 |  |

### ImageGroup Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| src-list | `string[]` | `undefined` | 图片列表 | NEXT_VERSION |
| show | `boolean` | `undefined` | 是否展示大图预览 | NEXT_VERSION |
| default-show | `boolean` | `undefined` | 默认展示大图预览 | NEXT_VERSION |
| current | `number` | `undefined` | 当前展示的图片的下标 | NEXT_VERSION |
| default-current | `number` | `0` | 默认展示的图片的下标 | NEXT_VERSION |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | 工具栏的渲染函数 | `2.38.2` |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | `boolean` | `false` | 是否展示工具栏的提示 | 2.24.0 |
| src-list | `string[]` | `undefined` | 图片列表 | NEXT_VERSION |
| on-preview-next | `() => void` | `undefined` | 点击下一张的回调 |  |
| on-preview-prev | `() => void` | `undefined` | 点击上一张的回调 |  |

### ImagePreview Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| src | `string` | `undefined` | 图片来源 | NEXT_VERSION |
| show | `boolean` | `undefined` | 是否展示大图预览 | NEXT_VERSION |
| default-show | `boolean` | `undefined` | 默认展示大图预览 | NEXT_VERSION |
| render-toolbar | `(props: { nodes: { prev: VNode, next: VNode, rotateCounterclockwise: VNode, rotateClockwise: VNode, resizeToOriginalSize: VNode, zoomOut: VNode, zoomIn: VNode, download: VNode, close: VNode } }) => VNodeChild` | `undefined` | 工具栏的渲染函数 | NEXT_VERSION |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 | NEXT_VERSION |
| show-toolbar-tooltip | `boolean` | `false` | 是否展示工具栏的提示 | NEXT_VERSION |
| on-update:show | `(value: boolean) => void` | `undefined` | 显示状态改变的回调函数 | NEXT_VERSION |
| onClose | `() => void` | `undefined` | 关闭预览时的回调 | NEXT_VERSION |

### Image Slots

| 名称        | 参数 | 说明                       | 版本   |
| ----------- | ---- | -------------------------- | ------ |
| placeholder | `()` | 图像没有加载成功时候的占位 | 2.30.5 |
| error       | `()` | 图像加载失败时候的占位     | 2.40.2 |

### ImageGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 图像组的内容 |

### Image Methods

| 名称        | 类型         | 说明             | 版本         |
| ----------- | ------------ | ---------------- | ------------ |
| showPreview | `() => void` | 手动打开大图预览 | NEXT_VERSION |
