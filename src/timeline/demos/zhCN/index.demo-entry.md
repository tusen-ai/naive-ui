# 时间线 Timeline

这个世界有两个纬度：时间、事件。

## 演示

```demo
basic.vue
size.vue
item-placement.vue
horizontal.vue
customize-icon.vue
nested-debug.vue
```

## API

### Timeline Props

| 名称           | 类型                  | 默认值      | 说明     |
| -------------- | --------------------- | ----------- | -------- |
| horizontal     | `boolean`             | `'false'`   | 水平的   |
| icon-size      | `number`              | `undefined` | 图标大小 |
| item-placement | `'left' \| 'right'`   | `'left'`    | 方向     |
| size           | `'medium' \| 'large'` | `'medium'`  | 大小     |

### TimelineItem Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| color | `string` | `undefined` | 选项的颜色 |  |
| content | `string` | `undefined` | 选项内容 |  |
| line-type | `'default' \| 'dashed'` | `'default'` | 线的类型 | 2.26.1 |
| time | `string` | `undefined` | 选项时间 |  |
| title | `string` | `undefined` | 选项标题 |  |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 选项类型 |  |

### Timeline Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 时间线内容 |

### TimelineItem Slots

| 名称    | 参数 | 说明                 |
| ------- | ---- | -------------------- |
| default | `()` | 时间线选项内容       |
| icon    | `()` | 时间线选项自定义图标 |
| footer  | `()` | 时间线选项底部内容   |
| header  | `()` | 时间线选项头部内容   |
