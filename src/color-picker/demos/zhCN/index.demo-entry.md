# 颜色选择器 Color Picker

和真实世界比起来，它的空间是不连续的。

## 演示

```demo
basic
alpha
size
form
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | 默认是否展示弹出层 |
| default-value | `string` | `#000000` | 默认的颜色值 |
| modes | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | 颜色选择器支持颜色的格式，注意一旦你在某个模式下选择了值，颜色选择器值的格式将跟随这个格式 |
| to | `string \| HTMLElement` | `'body'` | 面板的卸载位置 |
| show | `boolean` | `undefined` | 是否展示面板 |
| show-alpha | `boolean` | `true` | 是否可调节 alpha 通道 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| null` | `undefined` | 颜色选择器的值 |
| on-complete | `(value: string) => void` | `undefined` | 颜色完成改变后的回调（在鼠标移动时候不会调用） |
| on-update:show | `(value: boolean) => void` | `undefined` | 面板可见状态改变的回调 |
| on-update:value | `(value: string) => void` | `undefined` | 颜色改变时的回调 |
