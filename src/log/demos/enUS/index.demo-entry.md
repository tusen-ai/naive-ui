# Log

<!--single-column-->

If you have some logs to show, use log.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  Due to package size, Naive UI doesn't include highlight.js. If you want highlight logs, make sure you have set highlightjs before using it.
</n-alert>

In highlight demo, we defined a language called `naive-log` which will highlight all the numbers of line. The following code shows how we defined it. If you want to know more about highlight.js, see <n-a href="https://highlightjs.org/" target="_blank">highlight.js</n-a> and <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html" target="_blank">highlight.js developer documentation</n-a>

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

## Demos

```demo
size.vue
event.vue
scroll.vue
highlight.vue
loading.vue
auto-bottom.vue
```

## API

### Log Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| font-size | `number` | `14` | Font size. |
| hljs | `Object` | `undefined` | If you want to set `hljs` locally, pass it using this prop. |
| language | `string` | `undefined` | The language of the log in `highlightjs`. |
| line-height | `number` | `1.25` | Line height. |
| lines | `Array<string>` | `undefined` | Display the log content by line. When the `log` parameter exists at the same time, the parameter is invalid. |
| loading | `boolean` | `false` | Whether to show loading. |
| log | `string` | `undefined` | The content of the log. |
| rows | `number` | `15` | Log size. |
| trim | `boolean` | `false` | Whether to display the log after `trim`. |
| on-require-more | `(from: 'top' \| 'bottom') => void` | `undefined` | Callback function for scroll loading log. |
| on-reach-top | `() => void` | `undefined` | Scroll to the top callback function. |
| on-reach-bottom | `() => void` | `undefined` | Scroll to the bottom callback function. |

### Log Methods

| Name | Parameters | Description |
| --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', slient?: boolean })` | Callback function for scroll event. |
