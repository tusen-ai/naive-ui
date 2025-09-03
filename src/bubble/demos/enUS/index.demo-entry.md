# Bubble

`Bubble` is a dialog bubble component, often used in chatting scenarios. It can display conversation content, supports customizing the avatar, header, content, and footer, can be placed on the left or right, and has a typing effect and a loading state display.

Available since `NEXT_VERSION`.

## Demos

```demo
basic.vue
avatar.vue
headerAndFooter.vue
variant.vue
loading.vue
typing.vue
markdown.vue
customRender.vue
```

## API

### Bubble Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | Content of Bubble. | NEXT_VERSION |
| gap | `string \| number` | `undefined` | The distance between the avatar and the bubble, if not set, will use the default value. | NEXT_VERSION |
| placement | `'start' \| 'end'` | `start` | Direction of Bubble. | NEXT_VERSION |
| avatar | `string` | '' | The image address of the bubble avatar. | NEXT_VERSION |
| loading | `boolean` | `false` | Whether to display the loading status. When it is set to 'true', loading will be displayed inside the bubble. | NEXT_VERSION |
| variant | `'filled' \| 'borderless' \| 'outlined' \| 'shadow'` | `filled` | Style variant. | NEXT_VERSION |
| shape | `'round' \| 'corner'` | `round` | Shape of bubble. | NEXT_VERSION |
| isMarkdown | `boolean` | `false` | Whether to process the content as Markdown format. | NEXT_VERSION |
| isTyping | `boolean` | `false` | Whether to enable the typing effect. | NEXT_VERSION |
| options | `TypewriterOptions` | `-` | Typing machine configuration. | NEXT_VERSION |

### TypewriterOptions

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| interval | `number` | `80` | Interval. | NEXT_VERSION |
| step | `number \| [number, number]` | `1` | Each time the number of characters added is in an array, it is randomly assigned between two numbers. | NEXT_VERSION |
| initialIndex | `number` | `5` | Initial display of word count. | NEXT_VERSION |

### Bubble Slots

| Name | Param | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| avatar | `-` | `BubbleAvatarSlot` | Customize the avatar display content. | NEXT_VERSION |
| header | `-` | `BubbleHeaderSlot` | Customize the top display content. | NEXT_VERSION |
| footer | `-` | `BubbleFooterSlot` | Customize the bottom display content. | NEXT_VERSION |
| loading | `-` | `BubbleLoadingSlot` | Customize the loading state display content. | NEXT_VERSION |
| content | `-` | `BubbleContentSlot` | Customize the content display content. | NEXT_VERSION |
