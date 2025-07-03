# 对话气泡

`Bubble` 是一个对话气泡组件，常用于聊天的时候。它可以展示对话内容，支持自定义头像、头部、内容、底部，/右放置，并且具备打字效果和加载状态展示

自 `NEXT_VERSION` 开始提供。

## 演示

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

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 气泡内要展示的文本内容 | NEXT_VERSION |
| placement | `'start' \| 'end'` | `start` | 信息位置 | NEXT_VERSION |
| avatar | `string` | '' | 气泡头像的图片地址 | NEXT_VERSION |
| loading | `boolean` | `false` | 是否显示加载状态。为 `true` 时，气泡内会显示加载 | NEXT_VERSION |
| variant | `'filled' \| 'borderless' \| 'outlined' \| 'shadow'` | `filled` | 气泡样式变体 | NEXT_VERSION |
| shape | `'round' \| 'corner'` | `round` | 气泡样式变体 | NEXT_VERSION |
| isMarkdown | `boolean` | `false` | 是否将 `content` 内容作为 Markdown 格式处理 | NEXT_VERSION |
| isTyping | `boolean` | `false` | 是否开启打字效果 | NEXT_VERSION |
| options | `TypewriterOptions` | `-` | 打字器配置 | NEXT_VERSION |

### TypewriterOptions

| 参数 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| interval | `number` | `80` | 间隔 | NEXT_VERSION |
| step | `number \| [number, number]` | `1` | 每次增加的字数，数组时即为两数之间随机 | NEXT_VERSION |
| initialIndex | `number` | `5` | 起始显示字数 | NEXT_VERSION |

### Bubble Slots

| 名称    | 参数 | 类型别名            | 说明                   | 版本         |
| ------- | ---- | ------------------- | ---------------------- | ------------ |
| avatar  | `-`  | `BubbleAvatarSlot`  | 自定义头像展示内容     | NEXT_VERSION |
| header  | `-`  | `BubbleHeaderSlot`  | 自定义顶部展示内容     | NEXT_VERSION |
| footer  | `-`  | `BubbleFooterSlot`  | 自定义底部展示内容     | NEXT_VERSION |
| loading | `-`  | `BubbleLoadingSlot` | 自定义加载状态展示内容 | NEXT_VERSION |
| content | `-`  | `BubbleContentSlot` | 自定义内容展示内容     | NEXT_VERSION |
