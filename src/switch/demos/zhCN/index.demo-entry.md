# 开关 Switch

我有一个 Switch，不过没时间玩。每每这个时候，我都会回忆起童年玩 NDS 的快乐时光。

## 演示

```demo
basic
size
content
loading
event
customize-value
shape
color
```

## API

### Switch Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked-value | `string \| boolean \| number` | `true` | 选中时对应的值 |
| default-value | `boolean` | `false` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载 |
| rail-style | `(info: { focused: boolean, checked: boolean }) => (CSSProperties \| string)` | `undefined` | 创建轨道样式的函数 |
| round | `boolean` | `true` | 是否为圆形按钮 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 开关大小 |
| unchecked-value | `string \| boolean \| number` | `false` | 未选中时对应的值 |
| value | `boolean` | `undefined` | 受控模式下的值 |
| on-update:value | `(value: boolean) => void` | `undefined` | 组件值发生变化的回调 |

### Switch Slots

| 名称      | 参数 | 说明             |
| --------- | ---- | ---------------- |
| checked   | `()` | 开关激活时的内容 |
| unchecked | `()` | 开关关闭时的内容 |
