# Typography

Naive UI provides some basic styling for common HTML tags. It also provides some components to render text better.

Typography is a kind of art.

## Demos

```demo
header
tags
text
router-link
```

## Props

### Text Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |
| strong | `boolean` | `false` |  |
| italic | `boolean` | `false` |  |
| underline | `boolean` | `false` |  |
| delete | `boolean` | `false` |  |
| code | `boolean` | `false` |  |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` |  |
| tag | `string` | `undefined` | What tag should be this component be rendered as. Won't work when `code` or `del` is set. |

### P Props

| Name  | Type                               | Default     | Description |
| ----- | ---------------------------------- | ----------- | ----------- |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` |             |

### H1, H2, H3, H4, H5, H6 Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align-text | `boolean` | `false` |  |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |
| prefix | `'bar'` | `undefined` |  |

### Ul, Ol Props

| Name       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| align-text | `boolean` | `false` |             |

### Blockquote Props

| Name       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| align-text | `boolean` | `false` |             |

## Slots

### All Typography Components

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
