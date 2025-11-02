# 倒计时 Countdown

每过一秒，就会少一秒。

## 演示

```demo
basic.vue
precision.vue
render.vue
reset.vue
finish-debug.vue
```

## API

### Countdown Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | 是否处于计时状态 | 2.23.2 |
| duration | `number` | `0` | 倒计时持续时间，单位毫秒，非响应式 | 2.23.2 |
| precision | `0 \| 1 \| 2 \| 3` | `0` | 倒计时的秒显示的精度 | 2.23.2 |
| render | `(props: { hours: number, minutes: number, seconds: number, milliseconds: number }) => VNodeChild` | `undefined` | 时间的渲染函数 | 2.23.2 |
| on-finish | `() => void` | `undefined` | 倒计时结束的回调 | 2.23.2 |

### Countdown Methods

| 名称  | 类型         | 说明 | 版本   |
| ----- | ------------ | ---- | ------ |
| reset | `() => void` | 重置 | 2.31.0 |
