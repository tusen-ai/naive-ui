# 卡片 Card

放点东西进去。

## 演示

```demo
basic.vue
size.vue
cover.vue
hoverable.vue
slots.vue
border.vue
segment.vue
closable.vue
no-title.vue
loading.vue
custom-style.vue
embedded.vue
rtl-debug.vue
embedded-debug.vue
```

## API

### Card Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否显示卡片边框 |  |
| closable | `boolean` | `false` | 是否允许关闭 |  |
| content-style | `Object \| string` | `undefined` | 卡片内容区域的样式 |  |
| embedded | `boolean` | `false` | 使用更深的背景色展现嵌入效果，只对亮色主题生效 |  |
| footer-style | `Object \| string` | `undefined` | 卡片底部区域的样式 |  |
| header-style | `Object \| string` | `undefined` | 卡片头部区域的样式 |  |
| header-extra-style | `Object \| string` | `undefined` | 卡片头部额外内容的样式 | 2.25.0 |
| hoverable | `boolean` | `false` | 卡片是否可悬浮 |  |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' }` | `false` | 卡片的分段区域设置 |  |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 卡片的尺寸 |  |
| tag | `string` | `'div'` | 卡片组件要渲染为什么标签 | 2.34.3 |
| title | `string` | `undefined` | 卡片的标题 |  |
| on-close | `() => void` | `undefined` | 点击卡片关闭图标时的回调 |  |

### Card Slots

| 名称         | 参数 | 说明         |
| ------------ | ---- | ------------ |
| cover        | `()` | 覆盖内容     |
| header       | `()` | 头部内容     |
| header-extra | `()` | 头部额外内容 |
| default      | `()` | 卡片内容     |
| footer       | `()` | 底部内容     |
| action       | `()` | 操作区域内容 |
