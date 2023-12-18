# 加载 Spin

按理说它叫做 Loading 也可以，但是为啥叫 Spin 呢？因为还有一个属性更少的内部组件叫 Loading。

## 演示

```demo
basic.vue
wrap.vue
description.vue
customize-icon.vue
delay.vue
```

## API

### Spin Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content-class | `string` | `undefined` | Spin 内容的类名 | 2.36.0 |
| content-style | `string \| Object` | `undefined` | Spin 内容的样式 | 2.36.0 |
| description | `string` | `undefined` | Spin 的文字信息 |
| rotate | `boolean` | `true` | 自定义的加载图标是否有旋转动画 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Spin 的尺寸 |
| show | `boolean` | `true` | 在填入内容的情况下 Spin 是否激活，直接使用 Spin 时不生效 |
| stroke-width | `number` | `undefined` | Spin 边缘的相对宽度，假定 Spin 的外侧半径是 100 |
| stroke | `string` | `undefined` | Spin 的颜色 |
| delay | `number` | `undefined` | 延迟显示加载效果的时间, 单位为毫秒（避免闪烁） |

### Spin Slots

| 名称        | 参数 | 说明                            |
| ----------- | ---- | ------------------------------- |
| default     | `()` | 如果填入，Spin 会包裹填入的内容 |
| description | `()` | Spin 的文字信息                 |
| icon        | `()` | 自定义的加载图标                |
