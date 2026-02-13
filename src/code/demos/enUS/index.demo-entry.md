# Code

Starting from NEXT_VERSION, Shiki is supported as an alternative code highlighter.

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include highlight.js or Shiki. If you want to use Code, make sure you have set highlight.js or Shiki before using it.
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

The following code shows how to set Shiki for Code. For more details please check the [Shiki](https://shiki.style/) documentation.

```html
<template>
  <n-config-provider :shiki="shiki">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { onMounted, ref } from 'vue'
  import { createHighlighter } from 'shiki'

  export default defineComponent({
    setup() {
      const shiki = ref(null)
      onMounted(async () => {
        const highlighter = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['javascript']
        })

        shiki.value = {
          codeToHtml(code: string) {
            return highlighter.codeToHtml(code, {
              lang: 'javascript',
              themes: {
                light: 'github-light',
                dark: 'github-dark'
              }
            })
          }
        }
      })

      return {
        shiki
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
shiki.vue
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
| shiki | `Shiki` | `undefined` | Provide a Shiki instance if you'd like to use Shiki for highlighting. | NEXT_VERSION |

### Shiki Type

```ts
interface Shiki {
  /**
   * The consumer (e.g. n-code / n-log) only cares about the rendered HTML string.
   * Users may configure languages, themes or hooks when constructing the Shiki
   * instance, but all those details should be hidden behind this single method.
   */
  codeToHtml: (
    code: string,
    options: { lang: string, theme?: string | object }
  ) => string
}
```
