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

## Props

### Steps Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| current | `number` | `undefined` |  |
| size | `'small' \| 'medium'` | `'medium'` |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` |  |
| vertical | `boolean` | `false` |  |

### Step Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` |  |
| title | `string` | `undefined` |  |

## Slots

### Steps Slots

| Name        | Parameters | Description                      |
| ----------- | ---------- | -------------------------------- |
| default     | `()`       |                                  |
| finish-icon | `()`       | `'finish'` status button deploy. |
| error-icon  | `()`       | `'error'` status button deploy.  |

### Step Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
