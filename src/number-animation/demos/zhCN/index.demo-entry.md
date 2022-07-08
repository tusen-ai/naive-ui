# 数值动画 Number Animation

这个动画，那么有科技感，快请到我们的大屏上来。

## 演示

```demo
basic.vue
precision.vue
separator.vue
intl.vue
finish.vue
```

## API

### NumberAnimation Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | 是否开始动画 | 2.23.2 |
| duration | `number` | `3000` | 动画持续时间 | 2.23.2 |
| from | `number` | `0` | 数值动画起始值 | 2.23.2 |
| locale | `string` | 跟随 config provider | 国际化的语言 | 2.24.2 |
| precision | `number` | `0` | 精度，保留小数点后几位 | 2.23.2 |
| show-separator | `boolean` | `false` | 是否显示分隔符 | 2.23.2 |
| to | `number` | `undefined` | 目标值 | 2.23.2 |
| on-finish | `() => void` | `undefined` | 动画结束的回调 | 2.31.0 |

### NumberAnimation Methods

| 名称 | 参数 | 说明     | 版本   |
| ---- | ---- | -------- | ------ |
| play | `()` | 播放动画 | 2.23.2 |
