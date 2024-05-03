# 二维码 QR Code

总是即将过期。

`2.36.0` 版本开始提供该组件。

## 演示

```demo
basic.vue
icon.vue
size.vue
color.vue
error-correction.vue
download.vue
type.vue
```

## API

### QR Code Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| background-color | `string` | `'#FFF'` | 二维码背景颜色，值需要采用 `hex` 格式 | 2.36.0 |
| color | `string` | `'#000'` | 二维码颜色，值需要采用 `hex` 格式 | 2.36.0 |
| error-correction-level | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'M'` | 二维码纠错级别 | 2.36.0 |
| icon-background-color | `string` | `'#FFF'` | 图标背景颜色 | 2.36.0 |
| icon-border-radius | `number` | `4` | 图标背景圆角大小 | 2.36.0 |
| icon-size | `number` | `40` | 图标大小 | 2.36.0 |
| icon-src | `string` | `undefined` | 图标地址 | 2.36.0 |
| padding | `number \| string` | `12` | 二维码填充大小 | 2.36.0 |
| value | `string` | `''` | 文本信息 | 2.36.0 |
| size | `number` | `100` | 二维码大小 | 2.36.0 |
| type | `'canvas'` \| `'svg'` | `'canvas'` | 自定义二维码渲染类型 | 2.38.2 |

### 关于二维码纠错级别

二维码纠错级别是指在生成二维码时所使用的错误纠正能力，它决定了二维码在受到损坏或部分不可见时，仍然可以正确解码的能力。

二维码标准（如 QR 码）定义了四个纠错级别：L、M、Q 和 H。每个级别提供不同的纠错能力和容错性。

- `L（低）`：提供约 `7%` 的恢复能力
- `M（中）`：提供约 `15%` 的恢复能力
- `Q（高）`：提供约 `25%` 的恢复能力
- `H（最高）`：提供约 `30%` 的恢复能力

选择更高的纠错级别可以提高二维码的容错性，即在一定程度的损坏或变形下仍然能够正确解码，但同时会增加二维码的密度，使得二维码所占空间更大。
