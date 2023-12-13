# 面板分割 Split

灵活的布局工具，提供了用户自定义界面布局的可能性。

## 演示

```demo
basic.vue
vertical.vue
nest.vue
event.vue
slot.vue
```

## API

### Split Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | `Boolean` | `false` | 是否禁用 |
| direction | `horizontal \| vertical` | `horizontal` | Split 的分割方向 |
| min | `Number` | `0` | Split 的分割最小阈值，0-1 代表百分比 |
| max | `Number` | `1` | Split 的分割最大阈值，0-1 代表百分比 |
| size | `Number` | `0.5` | Split 的分割大小，0-1 代表百分比 |
| resize-trigger-size | `Number` | `3` | Split 的分隔条大小 |

### Split Slots

| 名称           | 参数 | 说明           |
| -------------- | ---- | -------------- |
| first          | `()` | 第一个面板内容 |
| second         | `()` | 第二个面板内容 |
| resize-trigger | `()` | 分割条内容     |
