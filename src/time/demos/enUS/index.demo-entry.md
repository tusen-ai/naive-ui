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

## API

### Time Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| format | `string` | `undefined` | Time format. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| time | `number \| Date` | `Date.now()` | Time. |
| to | `number \| Date` | `Date.now()` | Target time. |
| type | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | Time type. |
| unix | `boolean` | `false` | `unix` timestamp. |
