# Code

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include highlight.js. If you want to use Code, make sure you have set highlightjs before using it.
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
softwrap.vue
line-numbers.vue
```

## API

### Code Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| code | `string` | `''` | Incoming code string. |  |
| hljs | `Object` | `undefined` | If you want to set hljs locally, pass it using this prop. |  |
| inline | `boolean` | `false` | Whether the code is displayed as inline. |  |
| language | `string` | `undefined` | Code language in highlightjs. |  |
| show-line-numbers | `boolean` | `false` | Whether to show line numbers. Won't work if `inline` or `word-wrap` is `true`. | 2.32.0 |
| trim | `boolean` | `true` | Whether to display trimmed code. |  |
| word-wrap | `boolean` | `false` | Whether to display word-wrapped code. | 2.24.0 |
