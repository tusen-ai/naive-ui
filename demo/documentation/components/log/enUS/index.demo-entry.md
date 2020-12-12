# Log

<!--single-column-->

If you have some logs to show, use log.

<n-alert title="Note" type="warning" style="margin-bottom: 16px;">
  Due to package size, Naive UI doesn't include highlight.js. If you want highlight logs, make sure you have set highlightjs before using it.
</n-alert>

In hightlight demo, we defined a language called `naive-log` which will highlight all the numbers of line. The following code shows how we defined it. If you want to know more about hightlight.js, see <n-a href="https://highlightjs.org/">hightlight.js</n-a> and <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html">highlight.js developer documentation</n-a>

```js
// ...
hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/
    }
  ]
}))

naive.setHljs(hljs)
app.use(naive)
// ...
```

## Demos

```demo
size
event
scroll
highlight
loading
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| font-size | `number` | `14` |  |
| hljs | `Object` | `undefined` |  |
| language | `string` | `undefined` |  |
| line-height | `number` | `1.25` |  |
| lines | `Array<string>` | `undefined` |  |
| loading | `boolean` | `false` |  |
| log | `string` | `undefined` |  |
| rows | `number` | `15` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| trim | `boolean` | `false` |  |
| on-require-more | `(from: 'top' \| 'bottom') => any` | `undefined` |  |
| on-reach-top | `() => any` | `undefined` |  |
| on-reach-bottom | `() => any` | `undefined` |  |

## Methods

| Name | Parameters | Description |
| --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', slient?: boolean })` |  |
