# 标签 Tag

通常用来展示一些属性，偶尔也用来当一些备选的属性。

## 演示

```demo
basic.vue
bordered.vue
closable.vue
disabled.vue
size.vue
checkable.vue
shape.vue
color.vue
avatar.vue
icon.vue
rtl-debug.vue
```

## API

### Tag Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否有边框 |  |
| checkable | `boolean` | `false` | 是否可以选择，使用后 type 将不生效 |  |
| checked | `boolean` | `false` | 是否被选中，配合 checkable 一起使用 |  |
| closable | `boolean` | `false` | 是否可关闭 |  |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | 标签颜色，设置该项后　`type` 无效 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| round | `boolean` | `false` | 是否圆角 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |  |
| strong | `boolean` | `false` | 文字是否加粗 | 2.30.0 |
| trigger-click-on-close | `boolean` | `false` | 关闭时是否触发点击事件 | 2.32.2 |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | 类型 |
| on-close | `(e: MouseEvent) => void` | `undefined` | 点击关闭时的回调 |
| on-update:checked | `(value: boolean) => void` | `undefined` | 选择状态更改时的回调 |

### Tag Slots

| 名称    | 参数 | 说明         | 版本   |
| ------- | ---- | ------------ | ------ |
| avatar  | `()` | 标签中的头像 |        |
| default | `()` | 标签内容     |        |
| icon    | `()` | 标签中的图标 | 2.30.0 |
