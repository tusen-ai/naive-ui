# Code

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;">
  Due to package size, Naive UI doesn't include highlight.js. If you want use Code, make sure you have set highlightjs before using it.
</n-alert>

The following code shows how to set hljs of Code. Importing highlight.js on demand is recommonded, because it can significantly reduce bundle size of your app.

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

## Demos

```demo
basic.vue
inline.vue
```

## API

### Code Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| code | `string` | `''` | Incoming code string. |
| hljs | `Object` | `undefined` | If you want to set hljs locally, pass it using this prop. |
| language | `string` | `undefined` | Code language in highlightjs. |
| trim | `boolean` | `true` | Whether to display trimmed code. |
| inline | `boolean` | `false` | Whether the code is displayed as inline. |
