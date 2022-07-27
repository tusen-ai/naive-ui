# 水印 Watermark

出现在钱上的时候比较可爱。

## 演示

```demo
basic.vue
fullscreen.vue
image.vue
```

## API

### Watermark Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 水印文本 | 2.25.3 |
| cross | `boolean` | `false` | 是否跨越边界显示 | 2.25.3 |
| debug | `boolean` | `false` | 是否显示调试信息 | 2.25.3 |
| font-size | `number` | `14` | 字体大小 | 2.25.3 |
| font-family | `string` | `undefined` | 字体族 | 2.25.3 |
| font-style | `` 'normal' \| 'italic' \| `oblique ${number}deg`  `` | `normal` | 字体风格 | 2.25.3 |
| font-variant | `string` | `''` | 字型 | 2.25.3 |
| font-weight | `number` | `400` | 字重 | 2.25.3 |
| font-color | `string` | `rgba(128, 128, 128, .3)` | 字体颜色 | 2.25.3 |
| fullscreen | `boolean` | `false` | 是否展示全屏 | 2.25.3 |
| global-rotate | `number` | `0` | 水印整体的旋转 | 2.32.0 |
| line-height | `number` | `14` | 行高 | 2.25.3 |
| height | `number` | `32` | 高度 | 2.25.3 |
| image | `string` | `undefined` | 图片路径 | 2.25.3 |
| image-height | `number` | `undefined` | 图片高度 | 2.25.3 |
| image-opacity | `number` | `1` | 图片不透明度 | 2.25.3 |
| image-width | `number` | `undefined` | 图片宽度 | 2.25.3 |
| rotate | `number` | `0` | 旋转角度 | 2.25.3 |
| selectable | `boolean` | `true` | 被水印覆盖的内容是否可选中 | 2.25.3 |
| width | `number` | `32` | 宽度 | 2.25.3 |
| x-gap | `number` | `0` | x 轴间隔 | 2.25.3 |
| x-offset | `number` | `0` | x 轴偏移 | 2.25.3 |
| y-gap | `number` | `0` | y 轴间隔 | 2.25.3 |
| y-offset | `number` | `0` | y 轴偏移 | 2.25.3 |
| z-index | `number` | `10` | z 轴高度 | 2.25.3 |

### Watermark Slots

| 名称    | 参数 | 说明           | 版本   |
| ------- | ---- | -------------- | ------ |
| default | `()` | 水印覆盖的内容 | 2.25.3 |
