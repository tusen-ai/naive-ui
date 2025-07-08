# Mermaid Mermaid

就是为了 Markdown，我才包的这顿饺子。

自 `NEXT_VERSION` 开始提供。

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 mermaid。如果你需要使用代码组件，请确保你在使用之前已经设定了 mermaid。
</n-alert>

下面的代码展示了如何为 Mermaid 设定 mermaid。

```html
<template>
  <n-config-provider :mermaid="mermaid">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import mermaid from 'mermaid'
</script>
```

## 演示

```demo
basic.vue
flowchart.vue
sequence-diagram.vue
class-diagram.vue
state-diagram.vue
entity-relationship-diagram.vue
user-journey-diagram.vue
gatt.vue
pie-chart.vue
quadrant-chart.vue
requirement-diagram.vue
gitgraph-diagrams.vue
mindmap.vue
timeline-diagram.vue
sankey-diagram.vue
xy-chart.vue
kanban-diagram.vue
architecture-diagrams.vue
```

---

## API

### Mermaid Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| value | `string` | `''` | Mermaid 图表内容 | NEXT_VERSION |
| preview-disabled | `boolean` | `false` | 是否禁用单击图像预览 | NEXT_VERSION |
| mermaidTheme | `MermaidConfig['theme']` | `string` | 主题 [查看官方文档](https://mermaid.js.org/config/schema-docs/config.html#theme) | NEXT_VERSION |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | 图片在容器内的的适应类型 | NEXT_VERSION |
| img-props | `ImgHTMLAttributes` | `undefined` | 组件中 img 元素的属性 | NEXT_VERSION |
| previewed-img-props | `HTMLAttributes` | `undefined` | 预览图片时 img 元素的属性 | NEXT_VERSION |
| themeVariables | `any` | `undefined` | [查看官方文档](https://mermaid.js.org/config/schema-docs/config.html#themevariables) | NEXT_VERSION |
