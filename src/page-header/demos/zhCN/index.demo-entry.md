<!--single-column-->

# 页头 PageHeader

我感觉你很可能用不上这个组件，因为根据你拿到的设计稿很可能是重写一个简单。

## 演示

```demo
basic.vue
rtl-debug.vue
```

## API

### PageHeader Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| extra | `string` | `undefined` | 额外的文本信息，当使用 `extra` 插槽时该参数无效 |
| subtitle | `string` | `undefined` | 副标题 |
| title | `string` | `undefined` | 主标题 |
| on-back | `() => void` | `undefined` | 点击返回按钮的回调 |

### PageHeader Slots

| 名称     | 参数 | 说明       | 版本   |
| -------- | ---- | ---------- | ------ |
| avatar   | `()` | 图片信息   |        |
| header   | `()` | 头部信息   |        |
| default  | `()` | 内容       |        |
| extra    | `()` | 额外信息   |        |
| footer   | `()` | 底部信息   |        |
| subtitle | `()` | 副标题信息 |        |
| title    | `()` | 标题信息   |        |
| back     | `()` | 返回图标   | 2.24.2 |
