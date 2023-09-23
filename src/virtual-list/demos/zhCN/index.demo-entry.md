# 虚拟列表

当谈到虚拟列表时，能让你感觉列表像是无限长的，但实际上它只是在偷偷隐藏那些不可见的元素

就像是个懒惰的程序员拿着一个空白纸条说：“你看不见我，我也不会加载自己！”

## 演示

```demo
basic.vue
dynamic-size.vue
scroll.vue
keep-alive.vue
```

## API

### Virtual List Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| items | `Array<object>` | `[]` | 需要展示的数据 |  |
| item-resizable | `Number` | `undefined` | 是否启用动态尺寸，你不必关心项目大小，它会自动计算 |  |
| item-size | `Number` | `undefined` | 以像素为单位显示项目的最小高度，用于计算滚动大小和位置 |  |

### Virtual List Slots

| 名称    | 参数 | 说明                     | 版本 |
| ------- | ---- | ------------------------ | ---- |
| trigger | `()` | 触发弹出信息的组件或元素 |      |

### Virtual List Methods

| 名称    | 参数              | 说明                             |
| ------- | ----------------- | -------------------------------- |
| setShow | `(show: boolean)` | 非受控模式下控制是否显示 popover |
