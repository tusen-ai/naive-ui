# 数值动画 Number Animation

这个动画，那么有科技感，快请到我们的大屏上来。

## 演示

```demo
basic.vue
precision.vue
separator.vue
```

## API

### NumberAnimation Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| active | `boolean` | `true` | 是否开始动画 | NEXT_VERSION |
| duration | `number` | `3000` | 动画持续时间 | NEXT_VERSION |
| from | `number` | `0` | 数值动画起始值 | NEXT_VERSION |
| precision | `number` | `0` | 精度，保留小数点后几位 | NEXT_VERSION |
| show-separator | `boolean` | `false` | 是否显示分隔符 | NEXT_VERSION |
| to | `number` | `undefined` | 目标值 | NEXT_VERSION |

### NumberAnimation Methods

| 名称 | 参数 | 说明     | 版本         |
| ---- | ---- | -------- | ------------ |
| play | `()` | 播放动画 | NEXT_VERSION |
