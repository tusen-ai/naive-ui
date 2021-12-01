# 图像 Image

预览一下。

## 演示

```demo
basic
group
loading
error
```

## API

### Image Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| alt | `string` | `undefined` | 图片说明 |
| height | `string \| number` | `undefined` | 图片高度 |
| img-props | `object` | `undefined` | 组件中 img 元素的属性 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `fill` | 图片在容器内的的适应类型 |
| preview-src | `string` | `undefined` | 预览图片的图片地址 |
| can-preview | `boolean` | `true` | 是否可以点击图片进行预览 |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |
| src | `string` | `undefined` | 图片来源 |
| width | `string \| number` | `undefined` | 图片宽度 |
| on-error | `(e: Event) => void` | `undefined` | 图片加载失败执行的回调 |
| on-load | `(e: Event) => void` | `undefined` | 图片加载完成执行的回调 |

### Image Slots

| 名称     | 参数 | 说明                 |
| -------- | ---- | -------------------- |
| loading  | `()` | 图像加载中过度动画   |
| errorbox | `()` | 图像加载失败的占位图 |

### ImageGroup Props

| 名称         | 类型      | 默认值 | 说明                         |
| ------------ | --------- | ------ | ---------------------------- |
| show-toolbar | `boolean` | `true` | 图片放大后是否展示底部工具栏 |

### ImageGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 图像组的内容 |
