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

## API

### Steps Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| current | `number` | `undefined` | 当前选中在第几步 |
| size | `'small' \| 'medium'` | `'medium'` | 步骤条大小 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | 步骤条状态 |
| vertical | `boolean` | `false` | 步骤条方向 |

### Step Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `undefined` | 节点描述 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | 节点状态 |
| title | `string` | `undefined` | 节点标题 |

### Steps Slots

| 名称        | 参数 | 说明                    |
| ----------- | ---- | ----------------------- |
| default     | `()` | 步骤条内容              |
| finish-icon | `()` | `'finish'` 状态按钮配置 |
| error-icon  | `()` | `'error'` 状态按钮配置  |

### Step Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 步骤节点内容 |
| title   | `()` | 步骤节点标题 |
