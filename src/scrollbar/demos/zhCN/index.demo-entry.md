# 滚动条 Scrollbar

看起来好看点，但是我能保证这个没有原生滚动条可靠。

## 演示

```demo
basic.vue
x.vue
```

## API

### Scrollbar Props

| 名称         | 类型      | 默认值  | 说明             |
| ------------ | --------- | ------- | ---------------- |
| x-scrollable | `boolean` | `false` | 是否可以横向滚动 |

### Scrollbar Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | `()` | 滚动内容 |

### Scrollbar Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | 滚动内容 |
