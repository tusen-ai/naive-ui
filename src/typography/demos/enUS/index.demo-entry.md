# Typography

Naive UI provides some basic styling for common HTML tags; including components to render text better.

Typography is a kind of art.

## Demos

```demo
header
tags
text
router-link
```

## API

### Text Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Typography type. |
| strong | `boolean` | `false` | Strong. |
| italic | `boolean` | `false` | Italic. |
| underline | `boolean` | `false` | Underline. |
| delete | `boolean` | `false` | Strikethrough. |
| code | `boolean` | `false` | Code. |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` | Text depth. |
| tag | `string` | `undefined` | What tag should be this component be rendered as. Won't work when `code` or `del` is also used. |

### P Props

| Name  | Type                               | Default     | Description |
| ----- | ---------------------------------- | ----------- | ----------- |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` | Text depth. |

### H1, H2, H3, H4, H5, H6 Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align-text | `boolean` | `false` | Text align. |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Text depth. |
| prefix | `'bar'` | `undefined` | Show a bar in front of the heading. |

### Ul, Ol Props

| Name       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| align-text | `boolean` | `false` | Text align. |

### Blockquote Props

| Name       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| align-text | `boolean` | `false` | Text align. |

### All Typography Components

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of typography. |
