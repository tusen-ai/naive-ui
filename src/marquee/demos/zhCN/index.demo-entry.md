# 跑马灯 Marquee

我有一个高中同学，当时他的口头禅是：“滚滚滚。”

自 `NEXT_VERSION` 开始提供。

## 演示

```demo
basic.vue
image.vue
auto-fill.vue
```

## API

### Marquee Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| auto-fill | `boolean` | `false` | 是否重复的用内容铺满容器的空白 | NEXT_VERSION |
| speed | `number` | `48` | 移动的速度，单位是像素每秒 | NEXT_VERSION |

### Marquee Slots

| 名称    | 参数 | 说明 | 版本         |
| ------- | ---- | ---- | ------------ |
| default | `()` | 内容 | NEXT_VERSION |
