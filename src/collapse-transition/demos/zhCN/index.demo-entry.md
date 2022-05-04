# 折叠渐变 Collapse Transition

一个没什么封装的 collapse item。

## 演示

```demo
basic.vue
rtl-debug.vue
```

## API

### CollapseTransition Props

| 名称   | 类型      | 默认值  | 说明                     |
| ------ | --------- | ------- | ------------------------ |
| appear | `boolean` | `false` | 是否在首次出现时播放动画 |
| show   | `boolean` | `true`  | 是否展示内容             |

### CollapseTransition Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 渐变的内容 |
