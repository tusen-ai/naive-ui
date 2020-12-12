# 卡片 Card

一些经验不足的 UI 设计师喜欢在它上面滥用阴影。

## 演示

```demo
basic
size
cover
slots
border
segment
closable
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` |  |
| closable | `boolean` | `false` |  |
| content-style | `Object \| string` | `undefined` |  |
| header-style | `Object \| string` | `undefined` |  |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }` | `false` |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` |  |
| themed-style | `{ [themeName: string]: Object }` | `undefined` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| title | `string` | `undefined` |  |
| on-close | `() => any` | `undefined` | 点击卡片关闭图标时的回调 |

## Slots

| 名称         | 参数 | 说明 |
| ------------ | ---- | ---- |
| cover        | `()` |      |
| header       | `()` |      |
| header-extra | `()` |      |
| default      | `()` |      |
| footer       | `()` |      |
| action       | `()` |      |
