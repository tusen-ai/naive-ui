# 头像 Avatar

在互联网上，没有人知道你是一条狗。

## 演示

```demo
error-placeholder-debug.vue
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

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | 头像是否带边框 |  |
| color | `string` | `undefined` | 头像的背景色 |  |
| fallback-src | `string` | `undefined` | 头像加载失败时显示的图片的地址 |  |
| img-props | `object` | `undefined` | 组件中 img 元素的属性 | 2.34.0 |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | `lazy=true` 时 intersection observer 观测的配置 | 2.31.0 |
| lazy | `boolean` | `false` | 是否在进入 `intersection-observer-options` 配置的视口之后再开始加载 | 2.31.0 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 头像的图片在容器内的的适应类型 |  |
| render-fallback | `() => VNodeChild` | `undefined` | 加载失败的渲染函数 | 2.33.4 |
| render-placeholder | `() => VNodeChild` | `undefined` | 占位的渲染函数 | 2.33.4 |
| round | `boolean` | `false` | 头像是否圆形 |  |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像的尺寸 |
| src | `string` | `undefined` | 头像的地址 |  |
| on-error | `(e: Event) => void` | `undefined` | 头像的图片加载失败执行的回调 |  |

### AvatarGroup Props

| 名称      | 类型                  | 默认值      | 说明                   |
| --------- | --------------------- | ----------- | ---------------------- |
| max       | `number`              | `undefined` | 组内头像显示的最大个数 |
| max-style | `Object \| string`    | `undefined` | 溢出标识的样式         |
| options   | `Array<AvatarOption>` | `[]`        | 头像组的选项           |
| vertical  | `boolean`             | `false`     | 组内头像是否垂直排列   |

参考 [Avatar Props](avatar#Props)

### Avatar Slots

| 名称        | 参数 | 说明                       | 版本   |
| ----------- | ---- | -------------------------- | ------ |
| default     | `()` | 头像内填充的内容           |        |
| fallback    | `()` | 加载失败的内容             | 2.33.4 |
| placeholder | `()` | 图像没有完成加载时候的占位 | 2.31.0 |

### AvatarGroup Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| avatar | `(info: { option: { src: string } })` | 头像组头像 |
| default | `()` | 头像组内填充的内容 |
| rest | `(info: { options: Array<{ src: string }>, rest: number })` | 头像组溢出容器 |
