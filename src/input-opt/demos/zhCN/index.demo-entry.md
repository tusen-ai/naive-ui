# 验证码 InputOpt

输入一次性密码

## 演示

```demo
basic.vue
status.vue
mask.vue
template.vue
size.vue
form.vue
pattern.vue
rtl-debug.vue
```

## API

### InputOpt Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | `boolean` | `false` | 是否禁用 |  |
| mask | `boolean` | `false` | 是否是密码模式 |  |
| readonly | `boolean` | `false` | 是否只读 |  |
| length | `number` | `6` | 验证码的长度，根据长度渲染对应个数的输入框 |  |
| defaultValue | `string` |  | 默认值 |  |
| value | `string` |  | 验证码输入框的值，受控模式 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框尺寸 |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 |  |
| allow-input | `(value: string) => false` | `undefined` | 校验当前的输入是否合法，如果返回 `false` 输入框便不会响应此次的输入 |  |
| on-input | `(char: string, index: number) => void` | `undefined` | 输入框在用户输入时触发 |  |
| on-blur | `() => void` | `undefined` | 输入框失去焦点时触发 |  |
| on-change | `(value: string \| [string, string]) => void` | `undefined` | 输入值改变时触发的回调 |  |
| on-finish | `(value: string) => void` | `undefined` | 完成输入的回调 |  |
| on-update:value | `(value: string) => void` | `undefined` | 输入框值 change 时触发 |  |
