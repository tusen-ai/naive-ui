<!--single-column-->

# PageHeader

I think you possibly can't take advantage of the component. Since according to the design draft you received, writing a new component is the easier way.

## Demos

```demo
basic
```

## Props

| Name     | Type         | Default     | Description |
| -------- | ------------ | ----------- | ----------- |
| extra    | `string`     | `undefined` |             |
| subtitle | `string`     | `undefined` |             |
| title    | `string`     | `undefined` |             |
| on-back  | `() => void` | `undefined` |             |

## Slots

| Name     | Parameters | Description |
| -------- | ---------- | ----------- |
| avatar   | `()`       |             |
| header   | `()`       |             |
| default  | `()`       |             |
| extra    | `()`       |             |
| footer   | `()`       |             |
| subtitle | `()`       |             |
| title    | `()`       |             |
