# 侧边导航 Anchor

<!--single-column-->

下面的演示曾经用的是《世界尽头与冷酷仙境》的一些角色名称作为 Anchor 的子标题，但是这样的话和其他页面差的就有点远了。所以最后还是重写了这个页面，表示遗憾。

## 演示

```demo
basic
ignore-gap
affix
scrollto
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| affix | `boolean` | `false` | Anchor 是否像 Affix 一样展示，如果设定为 `true`，它还会接受 [Affix](affix#Props) 的 Props |
| bound | `number` | `12` |  |
| ignore-gap | `boolean` | `false` | 如果设定为 `true`, 导航将显示在准确的 href 区域 |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | 计算偏移位置相对的元素或选择器。如果你滚动的不是整个文档而只是其中的一部分，那你有可能要设定这个 |
| show-rail | `boolean` | `true` | 是否展示侧面的轨道 |
| show-background | `boolean` | `true` | 是否展示 link 的背景 |

## Methods

| 名称     | 类型                     | 说明 |
| -------- | ------------------------ | ---- |
| scrollTo | `(href: string) => void` |      |
