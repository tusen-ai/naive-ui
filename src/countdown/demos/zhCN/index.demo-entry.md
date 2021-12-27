# 倒计时 Countdown

每过一秒，就会少一秒。

## 演示

```demo
basic.vue
precision.vue
render.vue
```

## API

### Countdown Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | 是否处于计时状态 | NEXT_VERSION |
| duration | `string` | `0` | 倒计时持续时间，单位毫秒，非响应式 | NEXT_VERSION |
| precision | `0 \| 1 \| 2 \| 3` | `0` | 倒计时的秒显示的精度 | NEXT_VERSION |
| render | `(props: { hours: number, minutes: number, seconds: number, milliseconds: number }) => VNodeChild` | `undefined` | 时间的渲染函数 | NEXT_VERSION |
| on-finish | `() => void` | `undefined` | 倒计时结束的回调 | NEXT_VERSION |
