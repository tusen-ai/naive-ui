# Carousel 轮播图

一般用来播放一些好消息。

## 演示

```demo
basic
autoplay
hover
dot-placement
dot-style
show-arrow
centered
space-between
slides-per-view
slides-per-view-auto
effect
transition-name
keyboard
mousewheel
custom-dots
custom-arrow
```

## API

### Carousel Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autoplay | `boolean` | `false` | 是否自动播放 |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | 轮播指示点位置 |
| interval | `number` | `5000` | 自动播放的间隔 |
| show-arrow | `boolean` | `false` | 是否显示箭头按钮 |
| trigger | `'click' \| 'hover'` | `'click'` | 触发切换的方式 |

### Carousel Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 轮播的内容 |
