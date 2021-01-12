# 动态录入 Dynamic Input

<!--single-column-->

这个组件的名字改过很多次。

一开始它被造出来是为了输入环境变量。

## 演示

```demo
basic
pair
custom
form
```

## Props

### Dynamic Input Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `Array<any>` | `[]` |  |
| key-field | `string` | `undefined` |  |
| min | `number` | `0` | 最少有几项内容 |
| max | `number` | `undefined` | 最多有几项内容 |
| preset | `'input' \| 'preset'` | `'input'` | 动态录入使用的预设，在不设定 `$slots.default` 的时候生效。 |
| value | `Array<any>` | `undefined` |  |
| on-create | `(index: number) => any` | `undefined` | 点击添加按钮时的回调，如果设定则返回值会被用作新添加的初始值。其中 `index` 是创建内容将要被放置到的位置对应的数组索引，从 1 (第二项)开始计算。 |
| on-remove | `() => any` | `undefined` |  |
| on-update:value | `(value: any) => any` | `undefined` |  |

### Dynamic Input Props(Input Preset)

| 名称        | 类型            | 默认值   | 说明 |
| ----------- | --------------- | -------- | ---- |
| value       | `Array<string>` | required |      |
| placeholder | `string`        | `''`     |      |

### Dynamic Input Props(Pair Preset)

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `Array<{ key: string, value: string }>` | required |  |
| key-placeholder | `string` | `''` |  |
| value-placeholder | `string` | `''` |  |

## Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `(options: { value: any, index: number })` | 每一项的渲染方式，其中 `value` 为该项对应的数组值，`index` 为该项对应的数组索引 |
