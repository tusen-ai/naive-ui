# 图像 Image

预览一下。

## 演示

```demo
basic.vue
group.vue
error.vue
preview-disabled.vue
custom.vue
tooltip.vue
full-debug.vue
lazy.vue
previewed-img-props.vue
```

## API

### Image Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| alt | `string` | `undefined` | 图片说明 |  |
| fallback-src | `string` | `undefined` | 图片加载失败时显示的地址 |  |
| height | `string \| number` | `undefined` | 图片高度 |  |
| img-props | `object` | `undefined` | 组件中 img 元素的属性 |  |
| lazy | `boolean` | `false` | 是否在进入 `intersection-observer-options` 配置的视口之后再开始加载 | 2.30.5 |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | `lazy=true` 时 intersection observer 观测的配置 | 2.30.5 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 图片在容器内的的适应类型 |  |
| preview-src | `string` | `undefined` | 预览图片的图片地址 |  |
| preview-disabled | `boolean` | `false` | 是否禁用单击图像预览 |  |
| previewed-img-props | `object` | `undefined` | 预览图片时 img 元素的属性 | 2.34.0 |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | `boolean` | `false` | 是否展示工具栏的提示 | 2.24.0 |
| src | `string` | `undefined` | 图片来源 |  |
| width | `string \| number` | `undefined` | 图片宽度 |  |
| on-error | `(e: Event) => void` | `undefined` | 图片加载失败执行的回调 |  |
| on-load | `(e: Event) => void` | `undefined` | 图片加载完成执行的回调 |  |

### ImageGroup Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |  |
| show-toolbar-tooltip | `boolean` | `false` | 是否展示工具栏的提示 | 2.24.0 |

### Image Slots

| 名称        | 参数 | 说明                       | 版本   |
| ----------- | ---- | -------------------------- | ------ |
| placeholder | `()` | 图像没有加载成功时候的占位 | 2.30.5 |

### ImageGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 图像组的内容 |
