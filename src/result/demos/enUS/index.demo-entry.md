# Result

Result is for showing result.

Many thanks to [twemoji](https://github.com/twitter/twemoji) for creating those high quality icons.

## Demos

```demo
s-404
s-403
s-500
s-418
info
success
warning
error
size
```

## API

### Result Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` | Description. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Size. |
| status | `'info' \| 'success' \| 'warning' \| 'error' \| '404' \| '403' \| '500' \| '418'` | `'info'`| Status. |
| title | `string` | `undefined` | Title. |

### Result Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Results page content information.              |
| footer  | `()`       | Information at the bottom of the results page. |
