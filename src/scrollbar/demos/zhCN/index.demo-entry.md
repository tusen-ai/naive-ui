# 滚动条 Scrollbar

看起来好看点，但是我能保证这个没有原生滚动条可靠。

## 演示

```demo
basic.vue
x.vue
trigger.vue
no-sync.vue
rtl-debug.vue
```

## API

### Scrollbar Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content-class | `string` | `undefined` | 内容 div 的类名 | NEXT_VERSION |
| content-style | `string \| object` | `undefined` | 内容 div 的 style | NEXT_VERSION |
| size | `number` | `undefined` | 滚动条的大小 | 2.34.4 |
| trigger | `'hover' \| 'none'` | `'hover'` | 显示滚动条的时机，`'none'` 表示一直显示 | 2.29.1 |
| x-scrollable | `boolean` | `false` | 是否可以横向滚动 |  |
| on-scroll | `(e: Event) => void` | `undefined` | 滚动的回调 |  |

### Scrollbar Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 滚动内容 |

### Scrollbar Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | 滚动特定距离 |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | 滚动内容 |
