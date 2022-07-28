# 步骤 Steps

<!--single-column-->

1、2、3...成了！

## 演示

```demo
basic.vue
size.vue
vertical.vue
content.vue
custom-icon.vue
click.vue
vertical-debug.vue
rtl-debug.vue
```

## API

### Steps Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| current | `number` | `undefined` | 当前选中在第几步 |  |
| size | `'small' \| 'medium'` | `'medium'` | 步骤条大小 |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | 步骤条状态 |  |
| vertical | `boolean` | `false` | 步骤条方向 |  |
| on-update:current | `(index: number) => void` | `undefined` | 更新当前第几步的回调，设定后可点击切换步骤 | 2.29.1 |

### Step Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| description | `string` | `undefined` | 节点描述 |  |
| disabled | `boolean` | `false` | 是否可点击 | 2.29.1 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | 节点状态 |  |
| title | `string` | `undefined` | 节点标题 |  |

### Steps Slots

| 名称        | 参数 | 说明                    |
| ----------- | ---- | ----------------------- |
| default     | `()` | 步骤条内容              |
| finish-icon | `()` | `'finish'` 状态按钮配置 |
| error-icon  | `()` | `'error'` 状态按钮配置  |

### Step Slots

| 名称    | 参数 | 说明         | 版本   |
| ------- | ---- | ------------ | ------ |
| default | `()` | 步骤节点内容 |        |
| icon    | `()` | 步骤节点图标 | 2.26.1 |
| title   | `()` | 步骤节点标题 |        |
