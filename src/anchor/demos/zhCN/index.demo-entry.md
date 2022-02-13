# 侧边导航 Anchor

<!--single-column-->

你永远的指路明灯。

## 演示

```demo
basic.vue
ignore-gap.vue
affix.vue
scrollto.vue
max-height-debug.vue
```

## API

### Anchor Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| affix | `boolean` | `false` | Anchor 是否像 Affix 一样展示，如果设定为 `true`，它还会接受 [Affix](affix#Affix-Props) 的 Props |
| bound | `number` | `12` | 元素开始触发 anchor 的偏移量 |
| ignore-gap | `boolean` | `false` | 如果设定为 `true`, 导航将显示在准确的 href 区域 |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | 计算偏移位置相对的元素或选择器。如果你滚动的不是整个文档而只是其中的一部分，那你有可能要设定这个 |
| show-rail | `boolean` | `true` | 是否展示侧面的轨道 |
| show-background | `boolean` | `true` | 是否展示 link 的背景 |
| type | `'rail' \| 'block'` | `'rail'` | Anchor 的风格，`'block'` 为块状风格，`'rail'` 为轨道风格 |

### Anchor Methods

| 名称     | 类型                     | 说明                   |
| -------- | ------------------------ | ---------------------- |
| scrollTo | `(href: string) => void` | 手动触发到指定滚动位置 |
