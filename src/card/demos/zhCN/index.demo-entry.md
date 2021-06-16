# 卡片 Card

放点东西进去。

## 演示

```demo
basic
size
cover
hoverable
slots
border
segment
closable
no-title
loading
custom-style
rtl-debug
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 卡片是否显示 border |
| closable | `boolean` | `false` | 卡片是否显示 close 图标 |
| content-style | `Object \| string` | `undefined` | 卡片 content 的样式设置 |
| footer-style | `Object \| string` | `undefined` | 卡片 footer 的样式设置 |
| header-style | `Object \| string` | `undefined` | 卡片 header 的样式设置 |
| hoverable | `boolean` | `false` | 卡片是否可悬浮 |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` | 卡片的分段区域设置 |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 卡片的尺寸 |
| title | `string` | `undefined` | 卡片的标题 |
| on-close | `() => void` | `undefined` | 点击卡片关闭图标时的回调 |

## Slots

| 名称         | 参数 | 说明                        |
| ------------ | ---- | --------------------------- |
| cover        | `()` | cover 部分填充的内容        |
| header       | `()` | header 部分填充的内容       |
| header-extra | `()` | header-extra 部分填充的内容 |
| default      | `()` | card 默认填充的内容         |
| footer       | `()` | footer 部分填充的内容       |
| action       | `()` | action 部分填充的内容       |
