# 水印 Watermark

留下一点痕迹

## 演示

```demo
basic.vue
```

## API

### Watermark Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| width | `number` | `120` | 宽度 | NEXT_VERSION |
| height | `number` | `64` | 高度 | NEXT_VERSION |
| z-index | `number` | `10` | z 轴 | NEXT_VERSION |
| gap-x | `number` | `212` | x 轴间隔 | NEXT_VERSION |
| gap-y | `number` | `222` | y 轴间隔 | NEXT_VERSION |
| offset-top | `number` | - | 上边距 | NEXT_VERSION |
| offset-left | `number` | - | 左边距 | NEXT_VERSION |
| rotate | `number` | `-22` | 旋转角度 | NEXT_VERSION |
| image | `string` | - | 图片路径 | NEXT_VERSION |
| content | `string` | - | 文字内容 | NEXT_VERSION |
| font-size | `number \| string` | `16` | 字体大小 | NEXT_VERSION |
| font-family | string | `sans-serif` | 字体 | NEXT_VERSION |
| font-color | string | `rgba(0,0,0,.15)` | 字体颜色 | NEXT_VERSION |
| font-weight | `'normal' \| 'light' \| 'weight' \| number ` | `normal` | 字体粗细 | NEXT_VERSION |
| font-style | `'normal' \| 'italic' \| 'oblique' \| number` | `normal` | 字体风格 | NEXT_VERSION |
| selectable | `boolean` | `true` | 水印覆盖的内容是否可选中 | NEXT_VERSION |

### Watermark Slots

| 名称    | 参数 | 说明 | 版本         |
| ------- | ---- | ---- | ------------ |
| default | `()` | 内容 | NEXT_VERSION |
