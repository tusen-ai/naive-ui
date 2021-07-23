# Time

Time provide some basic formation for time.

## Demos

```demo
basic
type
format
relative
unix
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| format | `string` | `undefined` | Time format. |
| time | `number \| Date` | `Date.now()` | Time. |
| to | `number \| Date` | `Date.now()` | Target time. |
| type | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | Time type. |
| unix | `boolean` | `false` | `unix` timestamp. |
