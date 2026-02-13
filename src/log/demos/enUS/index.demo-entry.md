# Log

<!--single-column-->

If you have some logs to show, use log.

Shiki highlighting is supported starting from `NEXT_VERSION`.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include highlight.js or Shiki. If you want highlight logs, make sure you have set highlight.js or Shiki before using it.
</n-alert>

In the highlight.js demo on this page, we defined a language called `naive-log` which will highlight all the numbers of the line. The following code shows how we defined it. If you want to know more about highlight.js, see <n-a href="https://highlightjs.org/" target="_blank">highlight.js</n-a> and <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html" target="_blank">highlight.js developer documentation</n-a>

For Shiki highlighting, refer to the Shiki example below. You can read the <n-a href="https://shiki.matsu.io/" target="_blank">Shiki</n-a> documentation to learn more about how to use it.

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'

  hljs.registerLanguage('naive-log', () => ({
    contains: [
      {
        className: 'number',
        begin: /\d+/
      }
    ]
  }))

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

```html
<template>
  <n-config-provider :shiki="shiki">
    <my-app />
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { createHighlighter } from 'shiki'

  export default defineComponent({
    setup() {
      const shiki = ref()

      const naiveLogLanguage: LanguageInput = {
        name: 'naive-shiki-log',
        scopeName: 'source.naive-shiki-log',
        patterns: [
          {
            name: 'constant.numeric.naive-shiki-log',
            match: '\\b\\d+(?:\\.\\d+)?\\b'
          },
          {
            name: 'keyword.operator.naive-shiki-log',
            match: '\\b(INFO|WARN|ERROR|DEBUG)\\b'
          },
          {
            begin: '\\[',
            end: '\\]',
            name: 'punctuation.definition.bracket.naive-shiki-log'
          }
        ],
        repository: {}
      }

      onMounted(async () => {
        const highlighter = await createHighlighter({
          themes: ['vitesse-light'],
          langs: [naiveLogLanguage]
        })

        shiki.value = {
          codeToHtml(code: string) {
            return highlighter.codeToHtml(code, {
              lang: 'naive-shiki-log',
              theme: 'vitesse-light'
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
size.vue
event.vue
scroll.vue
highlight.vue
shiki.vue
loading.vue
auto-bottom.vue
```

## API

### Log Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| font-size | `number` | `14` | Font size. |  |
| hljs | `Object` | `undefined` | If you want to set `hljs` locally, pass it using this prop. |  |
| language | `string` | `undefined` | The language of the log in `highlightjs`. |  |
| line-height | `number` | `1.25` | Line height. |  |
| lines | `Array<string>` | `undefined` | Display the log content by line. When the `log` parameter exists at the same time, the parameter is invalid. |  |
| loading | `boolean` | `false` | Whether to show loading. |  |
| log | `string` | `undefined` | The content of the log. |  |
| rows | `number` | `15` | Log size. |  |
| trim | `boolean` | `false` | Whether to display the log after `trim`. |  |
| on-require-more | `(from: 'top' \| 'bottom') => void` | `undefined` | Callback function for scroll loading log. |  |
| on-reach-top | `() => void` | `undefined` | Scroll to the top callback function. |  |
| on-reach-bottom | `() => void` | `undefined` | Scroll to the bottom callback function. |  |
| shiki | `Shiki` | `undefined` | If you want to set `shiki` locally, pass it using this prop. | NEXT_VERSION |

### Log Methods

| Name | Parameters | Description |
| --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', silent?: boolean })` | Callback function for scroll event. |

### Shiki Interface

```ts
interface Shiki {
  /**
   * The consumer (e.g. n-code / n-log) only cares about the rendered HTML string.
   * Users may configure languages, themes or hooks when constructing the Shiki
   * instance, but all those details should be hidden behind this single method.
   */
  codeToHtml: (code: string) => string
}
```
