# 对话列表

`BubbleList` 是一个对话气泡列表组件，依赖于 `Bubble` 组件, 常用于聊天的时候。

## 演示

```demo
basic.vue
slots.vue
autoScroll.vue
```

## API

### BubbleList Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| data | `BubbleListData[]` | `[]` | 气泡数据列表 | NEXT_VERSION |
| roles | `Record<LLMRoleType, RoleType>` | `{}` | 设置气泡默认属性，`data` 中的 `role` 会进行自动对应 | NEXT_VERSION |
| autoScroll | `boolean` | `true` | 当内容更新时，自动滚动到最新位置。如果用户滚动，则会暂停自动滚动。 | NEXT_VERSION |
| gap | `string \| number` | `undefined` | 行与行之间的距离，如果不设定将使用默认值 | NEXT_VERSION |
| scrollbar-props | `ScrollbarProps` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props) | NEXT_VERSION |

### BubbleList Slots

| 名称 | 参数 | 类型别名 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| avatar | `(props: { item: BubbleListData, index：number )` | `BubbleAvatarSlot` | 自定义头像展示内容 | NEXT_VERSION |
| header | `(props: { item: BubbleListData, index：number )` | `BubbleHeaderSlot` | 自定义顶部展示内容 | NEXT_VERSION |
| footer | `(props: { item: BubbleListData, index：number )` | `BubbleFooterSlot` | 自定义底部展示内容 | NEXT_VERSION |
| loading | `(props: { item: BubbleListData, index：number )` | `BubbleLoadingSlot` | 自定义加载状态展示内容 | NEXT_VERSION |
| content | `(props: { item: BubbleListData, index：number )` | `BubbleContentSlot` | 自定义内容展示内容 | NEXT_VERSION |

### BubbleList Methods

| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', silent?: boolean })` | 滚动事件的回调函数 | NEXT_VERSION |
