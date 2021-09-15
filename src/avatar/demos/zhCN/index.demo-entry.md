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
v-show-debug
group
```

## API

### Avatar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| color | `string` | `undefined` | 头像的背景色 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 头像的图片在容器内的的适应类型 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像的尺寸 |
| src | `string` | `undefined` | 头像的地址 |
| round | `boolean` | `false` | 头像是否圆形 |
| on-error | `(e: Event) => void` | `undefined` | 头像的图片加载失败执行的回调 |

### Avatar Group Props

| 名称           | 类型               | 默认值      | 说明                   |
| -------------- | ------------------ | ----------- | ---------------------- |
| maxAvatarCount | `number`           | `undefined` | 组内头像显示的最大个数 |
| maxAvatarStyle | `Object \| string` | `undefined` | 触发隐藏头像的样式     |
| vertical       | `boolean`          | `false`     | 组内头像是否垂直       |

参考 [Avatar Props](avatar#Props)

### Avatar Slots

| 名称    | 参数 | 说明             |
| ------- | ---- | ---------------- |
| default | `()` | 头像内填充的内容 |

### Avatar Group Slots

| 名称    | 参数 | 说明               |
| ------- | ---- | ------------------ |
| default | `()` | 头像组内填充的内容 |
