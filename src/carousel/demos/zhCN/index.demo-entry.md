# Carousel 轮播图

一般用来播放一些好消息。

## 演示

```demo
basic
arrow
dots
autoplay
vertical
space-between
slides-per-view
slides-per-view-auto
centered
effect
transition-name
hover
keyboard
mousewheel
custom-arrow-and-dots
```

## API

### Carousel Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-index | `number` | `0` | 默认显示页 |
| active-index | `number` | `0` | 当前显示页 |
| show-arrow | `boolean` | `false` | 是否显示箭头按钮 |
| dot-style | `'dot' \| 'line' \| 'progress' \| 'never'` | `'dot'` | 轮播指示点样式 |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | 轮播指示点位置 |
| slides-per-view | `'auto' \| number` | `1` | 每一页显示的轮播图数量 |
| space-between | `number` | `0` | 轮播图之间的间距 |
| centered-slides | `boolean` | `false` | 是否居中显示当前页轮播图 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 轮播图显示的方向 |
| autoplay | `boolean` | `false` | 是否自动播放 |
| interval | `number` | `5000` | 自动播放的间隔（ms） |
| loop | `boolean` | `true` | 是否循环播放 |
| trigger | `'click' \| 'hover'` | `'click'` | 触发切换的方式 |
| effect | `'slide' \| 'fade' \| 'card'` | `'slide'` | 轮播图切换时的过渡效果 |
| speed | `number` | `300` | 过渡效果的持续时间（ms） |
| transition-timing-function | `string` | `undefined` | 过渡效果的速率函数 |
| transition-name | `string` | `undefined` | 自定义过渡效果 |
| draggable | `boolean` | `true` | 是否通过拖拽切换轮播图 |
| mousewheel | `boolean` | `false` | 是否通过鼠标滚轮切换轮播图，仅在垂直模式有效 |
| keyboard | `boolean` | `false` | 是否通过按键切换轮播图 |
| onChange | `(current: number, from: number) => void` | `undefined` | 当前页变化时的回调函数 |

### Carousel Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` | 轮播的内容 |
| arrow | `({total: number, current: number, slideTo: (index: number) => void, slidePrev: () => void, slideNext: (index) => void, isDisabledPrev: () => boolean, isDisabledNext: () => boolean})` | 箭头 |
| dots | `({total: number, current: number, slideTo: (index: number) => void})` | 控制器 |

### Carousel Methods

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| slideTo | `(index: number) => void` | 滑动至某一页 |
| slidePrev | `() => void` | 滑动至前一页 |
| slideNext | `() => void` | 滑动至后一页 |
| isActive | `(index: number) => boolean` | 判断是否为当前页 |
| isPrev | `(index: number) => boolean` | 判断是否为前一页 |
| isNext | `(index: number) => boolean` | 判断是否为后一页 |
| getPrevIndex | `(index?: number) => number \| null` | 获取前一页 |
| getNextIndex | `(index?: number) => number \| null` | 获取后一页 |