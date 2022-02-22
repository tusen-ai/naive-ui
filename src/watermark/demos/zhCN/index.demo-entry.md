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
| content | `string` | `undefined` | 水印文本 | NEXT_VERSION |
| cross | `boolean` | `false` | 是否跨越边界显示 | NEXT_VERSION |
| debug | `boolean` | `false` | 是否显示调试信息 | NEXT_VERSION |
| font-size | `number` | `14` | 字体大小 | NEXT_VERSION |
| font-family | `string` | `undefined` | 字体族 | NEXT_VERSION |
| font-style | `` 'normal' \| 'italic' \| `oblique ${number}deg`  `` | `normal` | 字体风格 | NEXT_VERSION |
| font-variant | `string` | `''` | 字型 | NEXT_VERSION |
| font-weight | `number` | `400` | 字重 | NEXT_VERSION |
| font-color | `string` | `rgba(128, 128, 128, .3)` | 字体颜色 | NEXT_VERSION |
| fullscreen | `boolean` | `false` | 是否展示全屏 | NEXT_VERSION |
| line-height | `number` | `14` | 行高 | NEXT_VERSION |
| height | `number` | `32` | 高度 | NEXT_VERSION |
| image | `string` | `undefined` | 图片路径 | NEXT_VERSION |
| image-height | `number` | `undefined` | 图片高度 | NEXT_VERSION |
| image-opacity | `number` | `1` | 图片不透明度 | NEXT_VERSION |
| image-width | `number` | `undefined` | 图片宽度 | NEXT_VERSION |
| rotate | `number` | `0` | 旋转角度 | NEXT_VERSION |
| selectable | `boolean` | `true` | 被水印覆盖的内容是否可选中 | NEXT_VERSION |
| width | `number` | `32` | 宽度 | NEXT_VERSION |
| x-gap | `number` | `0` | x 轴间隔 | NEXT_VERSION |
| x-offset | `number` | `0` | x 轴偏移 | NEXT_VERSION |
| y-gap | `number` | `0` | y 轴间隔 | NEXT_VERSION |
| y-offset | `number` | `0` | y 轴偏移 | NEXT_VERSION |
| z-index | `number` | `10` | z 轴高度 | NEXT_VERSION |

### Watermark Slots

| 名称    | 参数 | 说明           | 版本         |
| ------- | ---- | -------------- | ------------ |
| default | `()` | 水印覆盖的内容 | NEXT_VERSION |
