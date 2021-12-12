# 头像 Avatar

在互联网上，没有人知道你是一条狗。

## 演示

```demo
size
shape
color
badge
icon
name-size
object-fit
fallback
v-show-debug
```

## API

### Avatar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| color | `string` | `undefined` | 头像的背景色 |
| fallback-src | `string` | `undefined` | 头像加载失败时显示的图片的地址 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 头像的图片在容器内的的适应类型 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像的尺寸 |
| src | `string` | `undefined` | 头像的地址 |
| round | `boolean` | `false` | 头像是否圆形 |
| on-error | `(e: Event) => void` | `undefined` | 头像的图片加载失败执行的回调 |

### Avatar Slots

| 名称    | 参数 | 说明             |
| ------- | ---- | ---------------- |
| default | `()` | 头像内填充的内容 |
