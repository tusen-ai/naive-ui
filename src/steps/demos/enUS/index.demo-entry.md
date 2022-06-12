# Steps

<!--single-column-->

1, 2, 3... done!

## Demos

```demo
basic.vue
size.vue
vertical.vue
content.vue
custom-icon.vue
click.vue
```

## API

### Steps Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| current | `number` | `undefined` | Currently active step index. |  |
| size | `'small' \| 'medium'` | `'medium'` | Steps size. |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | Steps status. |  |
| vertical | `boolean` | `false` | Steps vertical. |  |
| on-update:current | `(index: number) => void` | `undefined` | Callback on currently active step index changed. If it's set, step can be switched by click. | 2.29.1 |

### Step Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| description | `string` | `undefined` | Step description. |  |
| disabled | `boolean` | `false` | Whether it's clickable. | 2.29.1 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | Step status. |  |
| title | `string` | `undefined` | Step title. |  |

### Steps Slots

| Name        | Parameters | Description                      |
| ----------- | ---------- | -------------------------------- |
| default     | `()`       | Steps content.                   |
| finish-icon | `()`       | `'finish'` status button deploy. |
| error-icon  | `()`       | `'error'` status button deploy.  |

### Step Slots

| Name    | Parameters | Description   | Version |
| ------- | ---------- | ------------- | ------- |
| default | `()`       | Step content. |         |
| icon    | `()`       | Step icon.    | 2.26.1  |
| title   | `()`       | Step title.   |         |
