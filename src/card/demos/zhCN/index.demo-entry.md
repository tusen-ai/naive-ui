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
| bordered | `boolean` | `true` |  |
| closable | `boolean` | `false` |  |
| content-style | `Object \| string` | `undefined` |  |
| footer-style | `Object \| string` | `undefined` |  |
| header-style | `Object \| string` | `undefined` |  |
| hoverable | `boolean` | `false` |  |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` |  |
| title | `string` | `undefined` |  |
| on-close | `() => void` | `undefined` | 点击卡片关闭图标时的回调 |

## Slots

| 名称         | 参数 | 说明 |
| ------------ | ---- | ---- |
| cover        | `()` |      |
| header       | `()` |      |
| header-extra | `()` |      |
| default      | `()` |      |
| footer       | `()` |      |
| action       | `()` |      |
