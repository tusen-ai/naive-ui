# 动态录入 Dynamic Input

<!--single-column-->

这个组件的名字改过很多次。

一开始它被造出来是为了输入环境变量。

## 演示

```demo
basic.vue
pair.vue
custom.vue
form.vue
move.vue
```

## API

### DynamicInput Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| create-button-props | `ButtonProps` | `undefined` | 新建项按钮的属性 | NEXT_VERSION |
| default-value | `unknown[]` | `[]` | 非受控模式下的默认值 |  |
| item-style | `string \| Object` | `undefined` | 动态录入中每项的样式 |  |
| key-field | `string` | `undefined` | 每一项的 key 值，会被用于列表渲染中 |  |
| min | `number` | `0` | 最少有几项内容 |  |
| max | `number` | `undefined` | 最多有几项内容 |  |
| preset | `'input' \| 'pair'` | `'input'` | 动态录入使用的预设，在不设定 `$slots.default` 的时候生效。 |  |
| show-sort-button | `boolean` | `false` | 是否显示排序按钮 | NEXT_VERSION |
| value | `unknown[]` | `undefined` | 受控模式下的值 |  |
| on-create | `(index: number) => void` | `undefined` | 点击添加按钮时的回调，如果设定则返回值会被用作新添加的初始值。其中 `index` 是创建内容将要被放置到的位置对应的数组索引，从 1 (第二项)开始计算 |  |
| on-remove | `(index: number) => void` | `undefined` | 点击第 index 项删除按钮的回调 |  |
| on-update:value | `(value: any) => void` | `undefined` | 组件值发生变化的回调 |  |

### DynamicInput Props(Input Preset)

| 名称        | 类型            | 默认值   | 说明                 |
| ----------- | --------------- | -------- | -------------------- |
| value       | `Array<string>` | required | Input 预设模式下的值 |
| placeholder | `string`        | `''`     | 每项的提示信息       |

### DynamicInput Props(Pair Preset)

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `Array<{ key: string, value: string }>` | required | Pair 预设模式下的值 |
| key-placeholder | `string` | `''` | 每项的 `key` 的提示信息 |
| value-placeholder | `string` | `''` | 每项的 `value` 的提示信息 |

### DynamicInput Slots

| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| default | `(options: { value: any, index: number })` | 每一项的渲染方式，其中 `value` 为该项对应的数组值，`index` 为该项对应的数组索引 |  |
| create-button-default | `()` | 新建项按钮的内容 | NEXT_VERSION |
| create-button-icon | `()` | 新建项按钮的图标 | NEXT_VERSION |
