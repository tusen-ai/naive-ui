# 二维码 Qrcode

犹如一位幽默风趣的魔术师，巧妙地将繁琐的信息变成了一个神秘的二维码

## 演示

```demo
basic.vue
border.vue
size.vue
color.vue
error-correction.vue
```

## API

### Qrcode Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bg-color | `string` | `#FFF` | 二维码背景颜色，值需要采用 `hex` 格式 |  |
| bordered | `boolean` | `true` | 是否显示二维码边框 |  |
| color | `string` | `#000` | 二维码颜色，值需要采用 `hex` 格式 |  |
| error-correction-level | `L` \| `M` \| `Q` \| `H` | `M` | 二维码纠错级别 |
| value | `string` | `-` | 文本信息 |  |
| size | `number` | `160` | 二维码大小 |
