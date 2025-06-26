# 打字器

`Typewriter` It is a typing device component.

Available since `NEXT_VERSION`.

## 演示

```demo
basic.vue
markdown.vue
customRender.vue
```

## API

### Typewriter Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | The text content to be displayed | NEXT_VERSION |
| isMarkdown | `Boolean` | `false` | Whether to enable Markdown rendering | NEXT_VERSION |
| options | `Options` | `-` | Typing machine configuration | NEXT_VERSION |

### Options

| 参数 | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| interval | `number` | `80` | Interval | NEXT_VERSION |
| step | `number \| [number, number]` | `1` | Each time the number of characters added is in an array, it is randomly assigned between two numbers | NEXT_VERSION |
| initialIndex | `number` | `5` | Initial display of word count | NEXT_VERSION |

### Typewriter Slots

| Name | 参数 | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| default | `(props: { typedContent: string })` | `TypewriterDefaultSlot` | Content rendering | NEXT_VERSION |
