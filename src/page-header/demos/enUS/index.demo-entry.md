<!--single-column-->

# PageHeader

I hope this component fits your demand.

## Demos

```demo
basic
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extra | `string` | `undefined` | Extra text information, when using the `extra` slot to change the parameter is invalid. |
| subtitle | `string` | `undefined` | Subtitle. |
| title | `string` | `undefined` | Title. |
| on-back | `() => void` | `undefined` | Click the callback of the back button. |

## Slots

| Name     | Parameters | Description           |
| -------- | ---------- | --------------------- |
| avatar   | `()`       | Image information.    |
| header   | `()`       | Header information.   |
| default  | `()`       | Content.              |
| extra    | `()`       | Extra information.    |
| footer   | `()`       | Footer information.   |
| subtitle | `()`       | Subtitle information. |
| title    | `()`       | Title information.    |
