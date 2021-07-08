# 步骤 Steps

<!--single-column-->

1、2、3...成了！

## 演示

```demo
basic
size
vertical
content
custom-icon
```

## Props

### Steps Props

| 名称     | 类型                                         | 默认值      | 说明 |
| -------- | -------------------------------------------- | ----------- | ---- |
| current  | `number`                                     | `undefined` |      |
| size     | `'small' \| 'medium'`                        | `'medium'`  |      |
| status   | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` |      |
| vertical | `boolean`                                    | `false`     |      |

### Step Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `undefined` |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` |  |
| title | `string` | `undefined` |  |

## Slots

### Steps Slots

| 名称        | 参数 | 说明                    |
| ----------- | ---- | ----------------------- |
| default     | `()` |                         |
| finish-icon | `()` | `'finish'` 状态按钮配置 |
| error-icon  | `()` | `'error'` 状态按钮配置  |

### Step Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
