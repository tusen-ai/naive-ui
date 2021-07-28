# 动态标签 Dynamic Tags

把标签变得可以输入。

## 演示

```demo
basic
form
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closable | `boolean` | `true` | 是否可关闭 |
| color | `string` | `undefined` | 标签颜色，设置该项后　`type` 无效 |
| default-value | `string[]` | `[]` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| input-style | `string \| Object` | `undefined` | 自定义输入框的样式 |
| round | `boolean` | `false` | 是否圆角 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸大小 |
| tag-style | `string \| Object` | `undefined` | 自定义标签的样式 |
| text-color | `string` | `undefined` | 标签文字颜色 |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | 标签类型 |
| value | `string[]` | `undefined` | 受控模式下的值 |
| on-update:value | `(value: boolean) => void` | `undefined` | 组件值发生变化时的回调 |
