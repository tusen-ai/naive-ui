# 打字器

`Typewriter` 是一个打字器组件

自 `NEXT_VERSION` 开始提供。

## 演示

```demo
basic.vue
markdown.vue
customRender.vue
options.vue
```

## API

### Typewriter Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 要展示的文本内容 | NEXT_VERSION |
| isMarkdown | `Boolean` | `false` | 是否开启 Markdown 渲染 | NEXT_VERSION |
| options | `TypewriterOptions` | `-` | 打字器配置 | NEXT_VERSION |

### TypewriterOptions

| 参数 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| interval | `number` | `80` | 间隔 | NEXT_VERSION |
| step | `number \| [number, number]` | `1` | 每次增加的字数，数组时即为两数之间随机 | NEXT_VERSION |
| initialIndex | `number` | `5` | 起始显示字数 | NEXT_VERSION |

### Typewriter Slots

| 名称 | 参数 | 类型别名 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default | `(props: { typedContent: string })` | `TypewriterDefaultSlot` | 内容渲染 | NEXT_VERSION |
