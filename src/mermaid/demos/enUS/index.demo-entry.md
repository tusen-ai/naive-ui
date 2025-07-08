# Mermaid

Mermaid is a component for rendering Mermaid diagrams.

Available since `NEXT_VERSION`.

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include mermaid. If you want to use Mermaid, make sure you have set mermaid before using it.
</n-alert>

The following code shows how to set mermaid of Mermaid.

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

## Demos

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

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| value | `string` | `''` | Mermaid diagram content. | NEXT_VERSION |
| preview-disabled | `boolean` | `false` | Whether clicking image preview is disabled. | NEXT_VERSION |
| mermaidTheme | `MermaidConfig['theme']` | `string` | theme [see official documentation](https://mermaid.js.org/config/schema-docs/config.html#theme). | NEXT_VERSION |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. | NEXT_VERSION |
| img-props | `ImgHTMLAttributes` | `undefined` | The props of the img element inside the component. | NEXT_VERSION |
| previewed-img-props | `HTMLAttributes` | `undefined` | DOM attributes of img element in preview mode. | NEXT_VERSION |
| themeVariables | `any` | `undefined` | [see official documentation](https://mermaid.js.org/config/schema-docs/config.html#themevariables) | NEXT_VERSION |
