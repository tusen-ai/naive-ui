# Markdown

`Markdown` 是一个Markdown 渲染组件，内部使用remark渲染。

自 `NEXT_VERSION` 开始提供。

## 演示

```demo
basic.vue
```

## API

### Bubble Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 气泡内要展示的文本内容 | NEXT_VERSION |
| placement | `'start' \| 'end'` | `start` | 信息位置 | NEXT_VERSION |
| avatar | `string` | '' | 气泡头像的图片地址 | NEXT_VERSION |
| loading | `boolean` | `false` | 是否显示加载状态。为 `true` 时，气泡内会显示加载状态。 | NEXT_VERSION |
| variant | `'filled' \| 'borderless' \| 'outlined' \| 'shadow'` | `filled` | 气泡样式变体 | NEXT_VERSION |
| shape | `'round' \| 'corner'` | `round` | 气泡样式变体 | NEXT_VERSION |
| isMarkdown | `boolean` | `false` | 是否将 `content` 内容作为 Markdown 格式处理。 | NEXT_VERSION |
| typing | `boolean \|  { step?: number, interval?: number }` | `false` | 是否开启打字效果。若为对象，可设置 step（每次渲染的字符数）和 suffix（打字光标后缀内容）。interval 表示打字间隔时间，单位为 ms。 | NEXT_VERSION |

### Bubble Slots

| 名称   | 参数 | 类型别名           | 说明 | 版本         |
| ------ | ---- | ------------------ | ---- | ------------ |
| avatar |      | `BubbleAvatarSlot` | 头像 | NEXT_VERSION |
