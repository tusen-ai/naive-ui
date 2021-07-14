# 开关 Switch

我有一个 Switch，不过没时间玩。每每这个时候，我都会回忆起童年玩 NDS 的快乐时光。

## 演示

```demo
basic
size
event
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `boolean` | `false` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 开关大小 |
| value | `boolean` | `undefined` | 受控模式下的值 |
| on-update:value | `(value: boolean) => void` | `undefined` | 组件值发生变化的回调 |
