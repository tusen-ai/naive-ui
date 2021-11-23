# Steps

<!--single-column-->

1, 2, 3... done!

## Demos

```demo
basic
size
vertical
content
custom-icon
```

## API

### Steps Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| current | `number` | `undefined` | Currently selected in the first steps. |
| size | `'small' \| 'medium'` | `'medium'` | Steps size. |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | Steps status. |
| vertical | `boolean` | `false` | Steps vertical. |

### Step Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` | Step description. |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | Step status. |
| title | `string` | `undefined` | Step title. |

### Steps Slots

| Name        | Parameters | Description                      |
| ----------- | ---------- | -------------------------------- |
| default     | `()`       | Steps content.                   |
| finish-icon | `()`       | `'finish'` status button deploy. |
| error-icon  | `()`       | `'error'` status button deploy.  |

### Step Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Step content. |
| title   | `()`       | Step title.   |
