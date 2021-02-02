# 数字输入 Input Number

输入数字就用它。

## 演示

```demo
basic
disabled
event
min-max
size
step
validator
```

## Props

| 名称            | 类型                             | 默认值      | 说明 |
| --------------- | -------------------------------- | ----------- | ---- |
| default-value   | `number \| null`                 | `null`      |      |
| disabled        | `boolean`                        | `false`     |      |
| max             | `number`                         | `undefined` |      |
| min             | `number`                         | `undefined` |      |
| placeholder     | `string`                         | `'请输入'`  |      |
| size            | `'small' \| 'medium' \| 'large'` | `'medium'`  |      |
| step            | `number`                         | `1`         |      |
| validator       | `(value) => boolean`             | `undefined` |      |
| value           | `number \| null`                 | `undefined` |      |
| on-blur         | `(event: FocusEvent) => any`     | `undefined` |      |
| on-focus        | `(event: FocusEvent) => any`     | `undefined` |      |
| on-update:value | `(value: number) => any`         | `undefined` |      |
