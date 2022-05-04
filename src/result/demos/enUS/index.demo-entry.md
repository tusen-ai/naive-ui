# Result

Result is for showing result.

Many thanks to [twemoji](https://github.com/twitter/twemoji) for creating those high quality icons.

## Demos

```demo
s-404.vue
s-403.vue
s-500.vue
s-418.vue
info.vue
success.vue
warning.vue
error.vue
size.vue
custom.vue
```

## API

### Result Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` | Description. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Size. |
| status | `'info' \| 'success' \| 'warning' \| 'error' \| '404' \| '403' \| '500' \| '418'` | `'info'` | Status. |
| title | `string` | `undefined` | Title. |

### Result Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| default | `()` | Results page content information. |  |
| footer | `()` | Information at the bottom of the results page. |  |
| icon | `()` | Custom icon content area. | 2.24.0 |
