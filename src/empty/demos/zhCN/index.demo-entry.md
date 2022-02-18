# 无内容 Empty

空<span style="opacity: 0;">空如</span>也。

## 演示

```demo
basic.vue
icon.vue
size.vue
```

## API

### Empty Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `'无数据'` | 描述信息 |
| show-description | `boolean` | `true` | 是否展示描述信息 |
| show-icon | `boolean` | `true` | 是否展示图标 |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | 尺寸大小 |

### Empty Slots

| 名称    | 参数 | 说明             |
| ------- | ---- | ---------------- |
| default | `()` | 代替 description |
| extra   | `()` | 扩展的内容       |
| icon    | `()` | 自定义图标       |
