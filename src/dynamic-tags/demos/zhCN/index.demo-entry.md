# 动态标签 Dynamic Tags

把标签变得可以输入。

## 演示

```demo
basic.vue
max.vue
form.vue
slot.vue
render-tag.vue
option-format.vue
on-create.vue
```

## API

### DynamicTags Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `true` | 是否可关闭 |  |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | 标签颜色，设置该项后 `type` 无效 |  |
| default-value | `string[] \| Array<{ label: string, value: string }>` | `[]` | 非受控模式下的默认值 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| input-props | `InputProps` | `undefined` | 内部 `n-input` 组件的属性 | 2.25.0 |
| input-class | `string` | `undefined` | 自定义输入框的类名 | 2.36.0 |
| input-style | `string \| Object` | `undefined` | 自定义输入框的样式 |  |
| max | `number` | `undefined` | tag 的最大数量 |  |
| round | `boolean` | `false` | 是否圆角 |  |
| render-tag | `((tag: string, index: number) => VNodeChild) \| ((tag: { label: string, value: string }, index: number) => VNodeChild)` | `undefined` | 自定义渲染 tag | 2.27.0 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸大小 |  |
| tag-class | `string` | `undefined` | 自定义标签的类名 | 2.36.0 |
| tag-style | `string \| Object` | `undefined` | 自定义标签的样式 |  |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | 标签类型 |  |
| value | `string[] \| Array<{ label: string, value: string }>` | `undefined` | 受控模式下的值 |  |
| on-create | `((label: string) => string) \| ((label: string) => ({ label: string, value: string }))` | `label => label` | 根据输入的值创造对应的选项 | 2.30.4 |
| on-update:value | `((value: string[]) => void) \| ((value: DynamicTagsOption[]) => void)` | `undefined` | 组件值发生变化时的回调 |  |

#### DynamicTagsOption Type

```ts
export interface DynamicTagsOption {
  label: string
  value: string
}
```

### DynamicTags Slots

| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| input | `(info: { submit: (value: any) => void, deactivate: () => void })` | 自定义输入元素，由用户填充 | `deactivate` 2.26.2 |
| trigger | `(info: { activate: () => void, disabled: boolean })` | 触发输入标签的组件或元素 |  |
