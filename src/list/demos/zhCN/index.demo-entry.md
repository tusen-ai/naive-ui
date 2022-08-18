# 列表 List

想让列表看起来优雅真的挺难的。但是也不能不做这个组件啊。

<!--single-column-->

## 演示

```demo
basic.vue
hoverable.vue
border.vue
rtl-debug.vue
```

## API

### List Props

| 名称         | 类型      | 默认值  | 说明                     | 版本   |
| ------------ | --------- | ------- | ------------------------ | ------ |
| bordered     | `boolean` | `false` | 是否显示边框             |        |
| clickable    | `boolean` | `false` | 列表项是否有可点击样式   | 2.32.2 |
| hoverable    | `boolean` | `false` | 列表项是否有悬浮样式     | 2.32.2 |
| show-divider | `boolean` | `true`  | 是否显示标项之间的分割线 | 2.32.2 |

### List Slots

| 名称    | 参数 | 说明           |
| ------- | ---- | -------------- |
| default | `()` | 列表的内容     |
| footer  | `()` | 列表底部的内容 |
| header  | `()` | 列表头部的内容 |

### ListItem Slots

| 名称    | 参数 | 说明             |
| ------- | ---- | ---------------- |
| default | `()` | 列表项的内容     |
| prefix  | `()` | 列表项的首部内容 |
| suffix  | `()` | 列表项的尾部内容 |
