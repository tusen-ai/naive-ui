# Time

Time provide some basic formation for time.

## Demos

```demo
basic.vue
type.vue
format.vue
relative.vue
unix.vue
timezone.vue
```

## API

### Time Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| format | `string` | `undefined` | Time format. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| time | `number \| Date` | `Date.now()` | Time. |  |
| time-zone | `string` | `undefined` | Time zone to be used to format the value. It follows [iana time zones](https://www.iana.org/time-zones). You can use `Intl.supportedValuesOf('timeZone')` to check supported values. | 2.30.0 |
| to | `number \| Date` | `Date.now()` | Target time. |  |
| type | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | Time type. |  |
| unix | `boolean` | `false` | `unix` timestamp. |  |
