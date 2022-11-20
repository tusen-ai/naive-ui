# Equation

No one will think of that a component library should have this component. However a friend of me need this.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include katex. If you want to use Equation, make sure you have setup katex before using it.
</n-alert>

The following code shows how to setup katex for Equation.

```html
<template>
  <n-config-provider :katex="katex">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import katex from 'katex'
  import 'katex/dist/katex.css'

  export default defineComponent({
    setup() {
      return {
        katex
      }
    }
  })
</script>
```

## Demos

```demo
basic.vue
katex-options.vue
```

## API

### Equation Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| katex | `object` | `undefined` | Katex | NEXT_VERSION |
| katex-options | `object` | `undefined` | Katex options for the equation. | NEXT_VERSION |
| value | `string` | `undefined` | Latex expression of the equation. | NEXT_VERSION |
