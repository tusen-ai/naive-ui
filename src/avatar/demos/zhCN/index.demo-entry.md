# 头像 Avatar

在互联网上，没有人知道你是一条狗。

## 演示

```demo
size.vue
shape.vue
color.vue
badge.vue
icon.vue
name-size.vue
fallback.vue
group.vue
lazy.vue
v-show-debug.vue
rtl-debug.vue
```

## API

### Avatar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | 头像是否带边框 |
| color | `string` | `undefined` | 头像的背景色 |
| fallback-src | `string` | `undefined` | 头像加载失败时显示的图片的地址 |
| lazy | `boolean` | `false` | 是否在进入 `intersection-observer-options` 配置的视口之后再开始加载 | NEXT_VERSION |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | `lazy=true` 时 intersection observer 观测的配置 | NEXT_VERSION |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 头像的图片在容器内的的适应类型 |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像的尺寸 |
| src | `string` | `undefined` | 头像的地址 |
| round | `boolean` | `false` | 头像是否圆形 |
| on-error | `(e: Event) => void` | `undefined` | 头像的图片加载失败执行的回调 |

### AvatarGroup Props

| 名称      | 类型                  | 默认值      | 说明                   |
| --------- | --------------------- | ----------- | ---------------------- |
| max       | `number`              | `undefined` | 组内头像显示的最大个数 |
| max-style | `Object \| string`    | `undefined` | 溢出标识的样式         |
| options   | `Array<AvatarOption>` | `[]`        | 头像组的选项           |
| vertical  | `boolean`             | `false`     | 组内头像是否垂直排列   |

参考 [Avatar Props](avatar#Props)

### Avatar Slots

| 名称        | 参数 | 说明                       |
| ----------- | ---- | -------------------------- | ------------ |
| default     | `()` | 头像内填充的内容           |
| placeholder | `()` | 图像没有加载成功时候的占位 | NEXT_VERSION |

### AvatarGroup Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| avatar | `(info: { option: { src: string } })` | 头像组头像 |
| default | `()` | 头像组内填充的内容 |
| rest | `(info: { options: Array<{ src: string }>, rest: number })` | 头像组溢出容器 |
