# 图标 Icon

naive-ui 推荐使用 [xicons](https://xicons.org) 作为图标库。

## 演示

```demo
basic.vue
custom-icon.vue
depth.vue
icon-wrapper.vue
```

## API

### Icon Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| color | `string` | `undefined` | 图标颜色 |
| depth | `1 \| 2 \| 3 \| 4 \| 5` | `undefined` | 图标深度 |
| size | `number \| string` | `undefined` | 图标大小（当不指定单位时，默认单位: `px`） |
| component | `Component` | `undefined` | 要展示的图标组件 | 2.24.6 |

### IconWrapper Props

| 名称          | 类型     | 默认值      | 说明         | 版本   |
| ------------- | -------- | ----------- | ------------ | ------ |
| border-radius | `number` | `6`         | 边框圆角大小 | 2.25.0 |
| color         | `string` | `undefined` | 颜色         | 2.25.0 |
| icon-color    | `string` | `undefined` | 图标颜色     | 2.25.0 |
| size          | `number` | `24`        | 尺寸         | 2.25.0 |

### Icon Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 图标的内容 |
