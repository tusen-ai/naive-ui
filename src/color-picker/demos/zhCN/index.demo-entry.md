# 颜色选择器 Color Picker

和真实世界比起来，它的空间是不连续的。

## 演示

```demo
basic.vue
alpha.vue
size.vue
disabled.vue
modes.vue
actions.vue
form.vue
swatches.vue
native.vue
close-debug.vue
```

## API

### ColorPicker Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | 默认是否展示弹出层 |  |
| default-value | `string \| null` | 和第一个 mode 对应的黑色值 | 默认的颜色值 |  |
| modes | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | 颜色选择器支持颜色的格式，注意一旦你在某个模式下选择了值，颜色选择器值的格式将跟随这个格式 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 面板的弹出位置 | 2.25.0 |
| render-label | `(color: string \| null) => VNodeChild` | `undefined` | 触发器的内容 | 2.24.0 |
| show | `boolean` | `undefined` | 是否展示面板 |  |
| show-alpha | `boolean` | `true` | 是否可调节 alpha 通道 |  |
| show-preview | `boolean` | `false` | 是否展示颜色预览块 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 颜色选择器的尺寸 |  |
| disabled | `boolean` | `false` | 是否禁用 | 2.24.5 |
| swatches | `string[]` | `undefined` | 色板的值 |  |
| to | `string \| HTMLElement \| false` | `'body'` | 面板的卸载位置，`false` 会待在原地 |  |
| value | `string \| null` | `undefined` | 颜色选择器的值 |  |
| on-complete | `(value: string) => void` | `undefined` | 颜色完成改变后的回调（在鼠标移动时候不会调用） |  |
| on-confirm | `(value: string) => void` | `undefined` | 点击确定按钮的回调 | 2.29.0 |
| on-update:show | `(value: boolean) => void` | `undefined` | 面板可见状态改变的回调 |  |
| on-update:value | `(value: string) => void` | `undefined` | 颜色改变时的回调 |  |
| actions | `Array<'confirm'> \| null` | `null` | 显示按钮 |  |
| internal-actions | `Array<'redo' \| 'undo' \| 'clear'>` | `undefined` | 内置操作选项 |  |

### ColorPicker Slots

| 名称  | 参数                      | 说明         | 版本   |
| ----- | ------------------------- | ------------ | ------ |
| label | `(color: string \| null)` | 触发器的内容 | 2.24.0 |

## Q & A

### 如何从颜色名称转化为色值

naive 不内置提供这种功能，你可以自己建立一个对象进行映射，见 [https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L803](https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L803)。

或者你自己写一个函数，例如：

```js
export function getRgb (colorName) {
  const el = document.createElement('div')
  el.style.color = colorName
  document.body.appendChild(el)
  const rgbColor = getComputedStyle(el).color
  document.body.removeChild(el)
  return rgbColor
}
```
